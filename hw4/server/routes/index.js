let express = require('express');
let router = express.Router();
let request = require('request');
let path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hw4', {useNewUrlParser: true});

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

const Deck = (id, owner, cards, name, description) => {
    this.id = id;
    this.owner = owner;
    this.cards = cards;
    this.name = name;
    this.description = description;
};

const CardSummary = (id, multiverseid, name, qty) => {
    this.id = id;
    this.multiverseid = multiverseid;
    this.name = name;
    this.qty = qty;
};


function cleanCards(cards) {
    for (let i = cards.length - 1; i >= 0; i--) {
        if (!cards[i].multiverseid) {
            cards.splice(i, 1);
        }
    }
    return cards;
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
router.post('/mtg/api/v1/login', function (req, res, next) {

});

/* logout. */
router.post('/logout', function (req, res, next) {

});

// ############# admin routers ################

router.all('/admin/:aid/*', (req, res, next) => {

});


/**
 * admin add a new user
 */
router.post('/admin/:aid/users', (req, res, next) => {

});

/**
 * admin search users
 */
router.get('/admin/:aid/users', (req, res, next) => {

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

});

/**
 * search cards.
 */
router.get('/users/:uid/cards', (req, res, next) => {
//total page 1720....
    let page = req.query.page ? parseInt(req.query.page) : 1;
    page = page === 0 || page <= 0 ? 1 : page;
    let APIPage = Math.floor((page - 1) / 4) + 1;
    let APISection = (page - 1) % 4 + 1;
    request('https://api.magicthegathering.io/v1/cards?page=' + APIPage, function (error, response, body) {
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

});

/**
 * search decks
 */
router.get('/users/:uid/decks', (req, res, next) => {

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
