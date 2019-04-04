var express = require('express');
var router = express.Router();


/* login. */
router.post('/login', function(req, res, next) {

});

/* logout. */
router.post('/logout', function(req, res, next) {

});

/* get a list of all users. */
router.get('/users', function(req, res, next) {

});

/* admin create a new users. */
router.post('/users', function(req, res, next) {

});

/* get a specific users. */
router.get('/users/:uid', function(req, res, next) {

});

/* update users' info. */
router.put('/users', function(req, res, next) {

});

/* get a list of all cards. */
router.get('/users/:uid/cards', function(req, res, next) {

});

/* get a cards. */
router.get('/users/:uid/cards/:multiverseid', function(req, res, next) {

});

/* add the cards to a deck */
router.post('/users/:uid/cards/:multiverseid/decks/:deckid', function(req, res, next) {

});

/* delete the card of a deck */
router.delete('/users/:uid/cards/:multiverseid/decks/:deckid', function(req, res, next) {

});

/* update card for that deck */
router.put('/users/:uid/cards/:multiverseid/decks/:deckid', function(req, res, next) {

});

/* get a list of all decks for that user. */
router.get('/users/:uid/decks', function(req, res, next) {

});

/* creat a new deck for that user. */
router.post('/users/:uid/decks', function(req, res, next) {

});

/* get a specific deck. */
router.get('/users/:uid/decks/:deckid', function(req, res, next) {

});

/* update a specific deck. */
router.put('/users/:uid/decks/:deckid', function(req, res, next) {

});

/* delete a specific deck. */
router.delete('/users/:uid/decks/:deckid', function(req, res, next) {

});


module.exports = router;
