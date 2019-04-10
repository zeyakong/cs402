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

/* get a list of all users. */
router.get('/users', function (req, res, next) {
    // let deck1 = new Deck('123', '1233132');
    // let deck2 = new Deck('1234', '12332222231231132');
    //
    // const kong = new User({
    //     email: 'kong',
    //     firstName: 'kong',
    //     lastName: 'zeya',
    //     enabled: true,
    //     password: '123',
    //     role: 'admin',
    //     decks: [deck1, deck2]
    // });
    // kong.save().then(() => console.log('meow'));
    // res.send('ok')

});

/* admin create a new users. */
router.post('/users', function (req, res, next) {

});

/* get a specific users. */
router.get('/users/:uid', function (req, res, next) {
    let uid = req.params.uid;
    User.findById(uid, (err, user) => {
        if (err || !user) {
            res.status(404).send('invalid uid');
            return;
        }
        res.send(user);
    });
});

/* update users' info. This application only allows admin enable/ disable a user*/
router.put('/users/:uid', function (req, res, next) {
    if(req.body.enabled){
        let enabled = req.body.enabled;
        //update the user
        let uid = req.params.uid;
        User.findById(uid, (err, user) => {
            if (err || !user) {
                res.status(404).send('invalid uid');
                return;
            }
            user.enabled = enabled;
            user.save((err,user)=>{
                res.send(user);
            });
        });
    }else{
        res.status('403').send('invalid request')
    }
});

/* get a list of all cards. */
router.get('/users/:uid/cards', function (req, res, next) {
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

/* get a cards. */
router.get('/users/:uid/cards/:mid', function (req, res, next) {
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

/* add the cards to a deck */
router.post('/users/:uid/cards/:mid/decks/:did', function (req, res, next) {

});

/* delete the card of a deck */
router.delete('/users/:uid/cards/:mid/decks/:did', function (req, res, next) {

});

/* update card for that deck */
router.put('/users/:uid/cards/:mid/decks/:did', function (req, res, next) {

});

/* get a list of all decks for that user. */
router.get('/users/:uid/decks', function (req, res, next) {

});

/* creat a new deck for that user. */
router.post('/users/:uid/decks', function (req, res, next) {

});

/* get a specific deck. */
router.get('/users/:uid/decks/:did', function (req, res, next) {

});

/* update a specific deck. */
router.put('/users/:uid/decks/:did', function (req, res, next) {

});

/* delete a specific deck. */
router.delete('/users/:uid/decks/:deckid', function (req, res, next) {

});


module.exports = router;
