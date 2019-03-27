var express = require('express');
var uuid = require('uuid');
var router = express.Router();
var db = require('./database.js');
var path = require('path');
var dateFormat = require('dateformat');

//######### variables & constructors ###########
function Token(id, name, url) {
    this.id = id;
    this.name = name;
    this.url = url;
}

function Theme(color, playerToken, computerToken) {
    this.color = color;
    this.playerToken = playerToken;
    this.computerToken = computerToken;
}

function Game(theme, status, start, finish, grid, userid) {
    this.theme = theme;
    this.status = status;
    this.start = start;
    this.finish = finish;
    this.grid = grid;
    this.userid = userid;
}

function User(email, password, defaultTheme) {
    this.email = email;
    this.password = password;
    this.default = defaultTheme;
}

function Error(msg) {
    this.msg = msg;
}

var GameDB = {};
var tokenList = [];
var metadata;

//################ functions ####################
function findToken(tokenId) {
    for (var i = 0; i < tokenList.length; i++) {
        if (tokenList[i].id == tokenId) {
            return tokenList[i];
        }
    }
    return null;
}

function findGame(sid, gid) {
    //for loop the game list and compare the game id.
    if (GameDB[sid]) {
        for (var i = 0; i < GameDB[sid].length; i++) {
            if (GameDB[sid][i].id === gid) {
                return GameDB[sid][i];
            }
        }
        return null;
    } else {
        return null;
    }
}

/*
this function checks the move action is valid or not
 */
function isValidMove(game, move) {
    return game.grid[0][move] === " ";
}

/**
 * this function will update the move. this function won't validate the move, which means you should
 * execute the isValidMove before when you wanna update the game.
 */
function updateGame(game, move, role) {
    //if this method executed, the move must be valid.
    for (var i = game.grid.length - 1; i >= 0; i--) {
        if (game.grid[i][move] === " ") {
            if (role === "player") {
                game.grid[i][move] = "X";
            } else if (role === "computer") {
                game.grid[i][move] = "O";
            }
            break;
        }
    }
    //update status
    var tokenType;
    //2. check the win condition. check row
    for (i = 0; i < game.grid.length; i++) {
        // if j >= 4 (index out of range)
        for (var j = 0; j < 4; j++) {
            tokenType = game.grid[i][j];
            if (tokenType == " ") continue;
            if (game.grid[i][j + 1] == tokenType && game.grid[i][j + 2] == tokenType && game.grid[i][j + 3] == tokenType) {
                game.finish = dateFormat(new Date(), "ddd mmm d yyyy");
                tokenType == 'X' ? game.status = 'VICTORY' : game.status = 'LOSS';
            }
        }
    }
    //check each col, i>=2 will cause index out of range exception
    for (i = 0; i < 2; i++) {
        for (j = 0; j < game.grid[i].length; j++) {
            tokenType = game.grid[i][j];
            if (tokenType == " ") continue;
            if (game.grid[i + 1][j] == tokenType && game.grid[i + 2][j] == tokenType && game.grid[i + 3][j] == tokenType) {
                game.finish = dateFormat(new Date(), "ddd mmm d yyyy");
                tokenType == 'X' ? game.status = 'VICTORY' : game.status = 'LOSS';
            }
        }
    }
    //check the diagonal. 1) left-up to right-down diagonal
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 4; j++) {
            tokenType = game.grid[i][j];
            if (tokenType == " ") continue;
            if (game.grid[i + 1][j + 1] == tokenType && game.grid[i + 2][j + 2] == tokenType && game.grid[i + 3][j + 3] == tokenType) {
                game.finish = dateFormat(new Date(), "ddd mmm d yyyy");
                tokenType == 'X' ? game.status = 'VICTORY' : game.status = 'LOSS';
            }
        }
    }
    // 2) check right-up to left-down diagonal
    for (i = 0; i < 2; i++) {
        for (j = 3; j < 7; j++) {
            tokenType = game.grid[i][j];
            if (tokenType == " ") continue;
            if (game.grid[i + 1][j - 1] == tokenType && game.grid[i + 2][j - 2] == tokenType && game.grid[i + 3][j - 3] == tokenType) {
                game.finish = dateFormat(new Date(), "ddd mmm d yyyy");
                tokenType == 'X' ? game.status = 'VICTORY' : game.status = 'LOSS';
            }
        }
    }
    // Finally, check the TIE. the top layer is full.
    var topLayerCount = 0;
    for (i = 0; i < game.grid[0].length; i++) {
        if (game.grid[0][i] != " ") topLayerCount++;
    }
    if (topLayerCount >= 7) {
        game.status = 'TIE';
        game.finish = dateFormat(new Date(), "ddd mmm d yyyy");
    }
}

/**
 * this function will return a integer range of min ~ max (min and max include)
 */
function getRandomInteger(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}


//################ database related function #############
function initialDB() {
    //first initial metadata
    let tokens = [
        new Token(uuid.v4(), "android", "/assets/android.png"),
        new Token(uuid.v4(), "chrome", "/assets/chrome.png"),
        new Token(uuid.v4(), "windows", "/assets/windows.png"),
        new Token(uuid.v4(), "linux", "/assets/linux.png"),
        new Token(uuid.v4(), "explorer", "/assets/explorer.png"),
        new Token(uuid.v4(), "mozilla", "/assets/mozilla.png"),
        new Token(uuid.v4(), "opera", "/assets/opera.png")
    ];

    let metadata = {
        default: new Theme("#ff0000", tokens[0], tokens[1]),
        tokens: tokens
    };
    db.collection('metadata').insertOne(metadata, (err, result) => {
        if (err) throw err;
        console.log('success import the metadata into database.')
    });

    //initial default users
    db.collection('users').insertMany([
        new User('bilbo@mordor.org', '123123123', new Theme("#ff0000", tokens[0], tokens[1])),
        new User('frodo@mordor.org', '234234234', new Theme("#ff0000", tokens[0], tokens[1])),
        new User('samwise@mordor.org', '345345345', new Theme("#ff0000", tokens[0], tokens[1]))
    ], (err, result) => {
        if (err) throw err;
        console.log('success import the default users into database.')
    });
}


//################ routers ######################
//return the whole html index file( the whole app)
router.get('/connectfour', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

//get a meta object from the response
router.get('/connectfour/api/v2/meta', function (req, res, next) {
    //init token list
    db.collection('metadata').find({}).toArray((err, docs) => {
        if (err) throw err;
        metadata = docs[0];
        res.send(metadata);
    });
});

/**
 * This router check all of the requests about the /connect4/api/v2/users/:uid.
 * if the user is valid(sid csrf uid) it will go next.
 * Otherwise, send 403 back.
 */
router.all('/connect4/api/v2/users/:uid', (req, res, next) => {
    // authenticate users
    let pathUid = req.params.uid;
    let sessionUser = req.session.user;
    let sessionCsrfToken = req.session.csrfToken;
    let reqCsrfToken = req.get('X-CSRF');

    if(reqCsrfToken && sessionCsrfToken &&sessionUser && pathUid){
        // verify the csrfToken
        if(reqCsrfToken === sessionCsrfToken){
            //verify the user
            db.collection('users').findOne({_id: pathUid}, (err, user) => {
                if (user && sessionUser && pathUid === sessionUser._id) {
                    next();
                } else {
                    res.status(403).send(new Error('incorrect authentication.'));
                }
            })
        }else{
            res.status(403).send(new Error('the request is not authenticated.'))
        }
    }else{
        res.status(403).send(new Error('the request is not authenticated.'))
    }
});

// get the list of all the games.
router.get('/connectfour/api/v2/users/:uid', function (req, res, next) {
    let uid = req.params.uid;
    // the uid was already validated by previous routers.
    // search the games collection and return the result.
    db.collection('games').find({userId:uid}).toArray((err,games)=>{
        if(err) throw err;
        res.send(games);
    });
});

// create a new game with this uid.
router.post('/connectfour/api/v2/users/:uid', function (req, res, next) {
    let uid = req.params.uid;
    let theme = new Theme(req.query.color, findToken(req.body.playerTokenId), findToken(req.body.computerTokenId));
    let grid = [
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "]
    ];
    let game = new Game(theme, "UNFINISHED", dateFormat(new Date(), "ddd mmm d yyyy"), "", grid,uid);
    //store it into database
    db.collection('games').insertOne(game,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//This endpoint delivers the game associated with the specified SID and having the specified game id.
router.get('/connectfour/api/v2/users/:uid/gids/:gid', function (req, res, next) {
    //find the gameDB for the sid
    let uid = req.params.uid;
    let gid = req.params.gid;
    //find game from db
    db.collection('games').findOne({userId: uid,_id:gid},(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//get the game object by this move. move is a query param
router.post('/connectfour/api/v2/users/:uid/gids/:gid', function (req, res, next) {
    let uid = req.params.uid;
    let gid = req.params.gid;
    let move = parseInt(req.query.move);
    db.collection('games').findOne({userId: uid,_id:gid},(err,game)=>{
        if(err) throw err;
        if (game) {
            if (game.status === 'UNFINISHED') {
                //player's move
                if (isValidMove(game, move)) {
                    updateGame(game, move, "player");
                }
                else {
                    res.send(new Error('invalid player move'));
                }
                if (game.status !== 'UNFINISHED') {
                    res.send(game);
                }
                else {
                    //if the game does not finish, computer will choose a move
                    move = getRandomInteger(0, 6);
                    while (!isValidMove(game, move)) {
                        move = getRandomInteger(0, 6);
                    }
                    updateGame(game, move, "computer");
                    res.send(game);
                }
            } else {
                res.send(new Error('The game is over.'))
            }
        } else {
            res.send(new Error('invalid sid or gid'));
        }
    });

});

function isValidUser(user) {
    return true;
}

/**
 * This endpoint accepts an object having email and password properties.
 * The email must be unique across all users.
 * The validation rules for password must be satisfied.
 * A user object is created such that the default theme is null.
 * Note that this method is not secure; it exists only to enable more convenient testing.
 */
router.post('/connect4/api/v2/users', function (req, res, next) {
    //get body params
    let userObj = req.body.user;
    if (userObj) {
        if (isValidUser(userObj)) {
            //add default metadata for this user
            userObj.default = metadata.default;
            db.collection('users').insertOne(userObj, (err, result) => {
                if (err) throw err;
                res.send(result);
            })
        } else {
            res.status(400).send(new Error('invalid username or password'))
        }
    } else {
        res.status(400).send(new Error('invalid body msg.'));
    }
});

/**
 * This endpoint accepts an object having email and password properties.
 * This object is contained in the body of the request using
 * application/x-www-form-urlencoded format.
 */
router.post('/connect4/api/v2/login', function (req, res, next) {
    //get params
    let email = req.body.email;
    let password = req.body.password;
    if (email && password) {
        //check the database
        db.collection('users').findOne({email: email, password: password}, (err, user) => {
            if (err) throw err;
            if (user) {
                //store in session.
                req.session.user = user;
                delete user.password;
                //add csrfToken
                csrfToken = uuid.v4();
                //store the csrfToken into session
                req.session.csrfToken = csrfToken;
                res.setHeader('X-CSRF', csrfToken);
                res.status(200).send(user);
            } else {
                res.status(403).send(new Error('incorrect email or password!'));
            }
        });
    } else {
        res.status(403).send(new Error('invalid inputs'));
    }
});

router.post('/connect4/api/v2/logout', function (req, res, next) {
    // invalid the session
    if (req.session) {
        req.session.destroy(function (err) {
            // cannot access session here
            if (err) throw err;
            res.status(200);
        })
    } else {
        //session doesn't exist.
        res.status(400);
    }
});

/**
 * This endpoint updates the user defaults.
 * The user defaults are initially null;
 * in which case the user uses the application default.
 */
router.put('/connect4/api/v2/users/:userid/default', function (req, res, next) {
    //get params
    let uid = req.params.userid;
    let defaults = req.body.defaults;
    if (defaults && uid) {
        //change the default.
        db.collection('users').updateOne({_id: uid},{$set: {default: defaults}},(err,result)=>{
            if(err) throw err;
            res.status(200).send(defaults);
        });
    } else {
        res.status(200).send(new Error('invalid defaults'));
    }
});

router.get('/connect4/api/v2/session', function (req, res, next) {
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
});

// ############## testing only #################
// router.all('/connect4/api/v2/test/:id', function (req, res, next) {
//     console.log("call the all * router");
//     next();
// });
//
// router.get('/connect4/api/v2/test/:id', function (req, res, next) {
//     console.log("call the /:id");
//     res.send('ok');
// });
//
// router.get('/connect4/api/v2/test/:id/2', function (req, res, next) {
//     console.log("call the /:id/2");
//     res.send('ok');
// });

module.exports = router;