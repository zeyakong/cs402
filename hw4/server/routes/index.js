let express = require('express');
let router = express.Router();
let request = require('request');
let path = require('path');
const mongoose = require('mongoose');
let uuid = require('uuid');
mongoose.connect('mongodb://localhost:27017/hw4', {useNewUrlParser: true});
let ObjectId = require('mongoose').Types.ObjectId;


//############ constructors & methods ##################
const User = mongoose.model('User', {
    email: String,
    firstName: String,
    lastName: String,
    enabled: Boolean,
    password: String,
    role: String,
    decks: [],
});

function Deck(id, owner, cards, name, description) {
    this.id = id;
    this.owner = owner;
    this.cards = cards;
    this.name = name;
    this.description = description;
}

function CardSummary(id, multiverseid, name, qty) {
    this.id = id;
    this.multiverseid = multiverseid;
    this.name = name;
    this.qty = qty;
}


function cleanCards(cards) {
    for (let i = cards.length - 1; i >= 0; i--) {
        if (!cards[i].multiverseid) {
            cards.splice(i, 1);
        }
    }
    return cards;
}


//##########################fuctions########
function isValidUser(user) {
    let email = user.email;
    let password = user.password;
    return validateEmail(email) && validatePassword(password);
}

/**
 * From stackoverflow: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 * @param email string email
 * @returns {boolean}
 */
function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    //check length
    if (password.length < 8) {
        return false;
    } else {
        //check the digital number
        let re = new RegExp("[0-9]");
        return re.test(String(password));
    }
}


/**
 * Design ideas
 *
 * All routers must have /users or /admin  cause all the functionality requires the user logged in.
 * uid: userId , mid: multiverseId, did: deckId, aid: adminId.
 * The prepath is '/mtg/api/v1'
 */
//############### routers ###################

router.get('/index', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

/* login. */
router.post('/login', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    if (email && password) {
        User.findOne({email: email, password: password}, (err, user) => {
            if (err) {
                res.status(404).send('invalid inputs');
                return;
            }
            if (user) {
                //store in session.
                user = user.toObject();
                req.session.user = user;
                delete user['password'];
                res.status(200).send(user);
            } else {
                res.status(404).send('invalid inputs');
            }
        })
    } else {
        res.status(404).send('invalid inputs');
    }
});

/* logout. */
router.post('/logout', function (req, res, next) {
    // invalid the session
    if (req.session) {
        req.session.destroy();
        res.status(200).send('ok');
    } else {
        //session doesn't exist.
        res.status(400).send();
    }
});

// ############# admin routers ################

router.all('/admin/:aid/*', (req, res, next) => {
    next();
});


/**
 * admin add a new user
 */
router.post('/admin/:aid/users', (req, res, next) => {
//get body params
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstName;
    let lastname = req.body.lastName;
    let role = req.body.role;
    let enabled = req.body.enabled;
    console.log(email + password + firstname + lastname + role + enabled);
    if (email && password && firstname && lastname && role) {
        let userObj = new User({
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            role: role,
            enabled: enabled
        });
        if (userObj) {
            if (isValidUser(userObj)) {
                //add default metadata for this user
                userObj.save((err, data) => {
                    if (err) {
                        res.status(400).send('invalid username')
                    }
                    res.status(200).send(data);
                });
            } else {
                res.status(400).send('invalid username or password')
            }
        } else {
            res.status(400).send('invalid body msg. correct format: { email:, password:xxx}');
        }
    } else {
        res.status(400).send('invalid body params');
    }
});

/**
 * admin search users
 */
router.get('/admin/:aid/users', (req, res, next) => {
    let keywords = req.query.keywords ? req.query.keywords : '';
    keywords = keywords === '*' ? '' : keywords;
    let regex = new RegExp(keywords);
    let objId = new ObjectId((keywords.length < 12) ? "123456789012" : keywords);
    User.find({
        $or: [
            {'_id': objId},
            {lastName: regex},
            {firstName: regex},
            {email: keywords}
        ]
    }, (err, data) => {
        if (err) {
            res.status(404).send('error')
        } else {
            res.send(data);
        }
    })
});

/**
 * admin update users
 * This application only allows an admin to enable/ disable a user
 */
router.put('/admin/:aid/users', (req, res, next) => {
    if (req.body.enabled) {
        let enabled = req.body.enabled;
        //update the user
        let uid = req.params.uid;
        User.findById(uid, (err, user) => {
            if (err || !user) {
                res.status(404).send('invalid uid');
                return;
            }
            user.enabled = enabled;
            user.save((err, user) => {
                res.send(user);
            });
        });
    } else {
        res.status('403').send('invalid request')
    }
});


//################# user routers ##################

/**
 * First : user validation:
 * validate the uid and session and csrf and enabled status.
 */
router.all('/users/:uid/*', (req, res, next) => {
    next()
});

/**
 * search cards.
 */
router.get('/users/:uid/cards', (req, res, next) => {
//total page 1720....
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let name = req.query.name ? req.query.name : '';
    let type = req.query.type ? req.query.type : '';
    let colors = req.query.colors ? req.query.colors : '';
    let set = req.query.set ? req.query.set : '';

    page = page === 0 || page <= 0 ? 1 : page;
    let APIPage = Math.floor((page - 1) / 4) + 1;
    let APISection = (page - 1) % 4 + 1;

    let url = '?name=' + name + '&type=' + type + '&colors=' + colors + '&set=' + set + '&page=' + APIPage;
    request('https://api.magicthegathering.io/v1/cards' + url, function (error, response, body) {
        // check section
        let APICards = JSON.parse(body).cards;
        switch (APISection) {
            case 1:
                //get first 0-25
                APICards = APICards.slice(0, 25);
                res.send(cleanCards(APICards));
                return;
            case 2:
                //get first 25-50
                APICards = APICards.slice(25, 50);
                res.send(cleanCards(APICards));
                return;
            case 3:
                //get first 50-75
                APICards = APICards.slice(50, 75);
                res.send(cleanCards(APICards));
                return;
            default:
                //get first 75-100
                APICards = APICards.slice(75, 100);
                res.send(cleanCards(APICards));
                return;
        }
    });
});

/**
 * get one card
 */
router.get('/users/:uid/cards/:mid', (req, res, next) => {
    if (req.params.mid) {
        request('https://api.magicthegathering.io/v1/cards/' + req.params.mid, function (error, response, body) {
            if (response && response.statusCode === 200) {
                res.send(body);
            } else {
                res.status(404).send('invalid multiverseid.');
            }
        });
    } else {
        res.status(404).send('invalid multiverseid.');
    }
});

/**
 * create a deck
 */
router.post('/users/:uid/decks', (req, res, next) => {
    let deckName = req.body.name;
    let uid = req.params.uid;
    let description = req.body.description;
    console.log('name: ' + deckName + ", uid: " + uid + ", des: " + description);
    if (deckName && uid && description) {
        //find user and add this deck into that user.
        User.findById(uid, (err, user) => {
            if (err) {
                res.status(400).send('cannot find the user with that uid');
            }
            let deck = new Deck(uuid.v4(), uid, [], deckName, description);
            user.decks.push(deck);
            user.save();
            res.send('ok');
        });
    } else {
        res.status(400).send('invalid body');
    }
});

/**
 * search decks
 */
router.get('/users/:uid/decks', (req, res, next) => {
    let uid = req.params.uid;
    User.findById(uid, (err, data) => {
        if (err) {
            res.status(400).send('cannot find the user with that uid');
        }
        res.send(data.decks);
    });
});

/**
 * get one deck
 */
router.get('/users/:uid/decks/:did', (req, res, next) => {

});

/**
 * get one card
 */
router.delete('/users/:uid/decks/:did', (req, res, next) => {

});

/**
 * update a deck: update the name/description or modify the cards info.
 * data was send by body
 */
router.put('/users/:uid/decks/:did', (req, res, next) => {

});


module.exports = router;
