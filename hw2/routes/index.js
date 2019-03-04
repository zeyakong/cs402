var express = require('express');
var uuid = require('uuid');
var router = express.Router();
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

function Game(theme, id, status, start, finish, grid) {
    this.theme = theme;
    this.id = id;
    this.status = status;
    this.start = start;
    this.finish = finish;
    this.grid = grid;
}

function Error(msg) {
    this.msg = msg;
}

var GameDB = {};
var tokenList = [];

//################ functions ####################
function findToken(tokenId){
    for(var i = 0 ; i<tokenList.length;i++){
        if(tokenList[i].id ==tokenId){
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
    //check the TIE. the top layer is full.
    var topLayerCount = 0;
    for (i = 0; i < game.grid[0].length; i++) {
        if (game.grid[0][i] != " ") topLayerCount++;
    }
    if (topLayerCount >= 7) {
        game.status = 'TIE';
        game.finish = dateFormat(new Date(), "ddd mmm d yyyy");
        return;
    }
}

/**
 * this function will return a integer range of min ~ max (min and max include)
 */
function getRandomInteger(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

//################ routers ######################
//return the whole html index file( the whole app)
router.get('/connectfour', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

//get the sid from the response
router.get('/connectfour/api/v1/sids', function (req, res, next) {
    res.setHeader('X-sid', uuid.v4());
    res.send();
});

//get a meta object from the response
router.get('/connectfour/api/v1/meta', function (req, res, next) {
    //init token list
    tokenList = [
        new Token(uuid.v4(), "android", "/assets/android.png"),
        new Token(uuid.v4(), "chrome", "/assets/chrome.png"),
        new Token(uuid.v4(), "windows", "/assets/windows.png"),
        new Token(uuid.v4(), "linux", "/assets/linux.png"),
        new Token(uuid.v4(), "explorer", "/assets/explorer.png"),
        new Token(uuid.v4(), "mozilla", "/assets/mozilla.png"),
        new Token(uuid.v4(), "opera", "/assets/opera.png")
    ];
    var metadata = {
        default: new Theme("#ff0000", tokenList[0], tokenList[1]),
        tokens: tokenList
    };
    res.send(metadata);
});

// get the list of all the games.
router.get('/connectfour/api/v1/sids/:sid', function (req, res, next) {
    var sid = req.params.sid;
    if (GameDB[sid]) {
        res.send(GameDB[sid]);
    } else {
        res.status(200).send(new Error("Not found! Check the sid."));
    }
});

// create a new game with this sid.
router.post('/connectfour/api/v1/sids/:sid', function (req, res, next) {
    var sid = req.params.sid;
    var theme = new Theme(req.query.color, findToken(req.body.playerTokenId), findToken(req.body.computerTokenId));
    var grid = [
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "]
    ];
    var game = new Game(theme, uuid.v4(), "UNFINISHED", dateFormat(new Date(), "ddd mmm d yyyy"), "", grid);
    if (GameDB[sid]) {
        GameDB[sid].push(game);
    } else {
        GameDB[sid] = [game];
    }
    res.send(game);
});

//This endpoint delivers the game associated with the specified SID and having the specified game id.
router.get('/connectfour/api/v1/sids/:sid/gids/:gid', function (req, res, next) {
    //find the gameDB for the sid
    var sid = req.params.sid;
    var gid = req.params.gid;
    var game = findGame(sid, gid);
    if (game)
        res.send(game);
    else
        res.send(new Error('invalid sid or gid'));
});

//get the game object by this move. move is a query param
router.post('/connectfour/api/v1/sids/:sid/gids/:gid', function (req, res, next) {
    var sid = req.params.sid;
    var gid = req.params.gid;
    var move = parseInt(req.query.move);
    var game = findGame(sid, gid);
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

module.exports = router;
