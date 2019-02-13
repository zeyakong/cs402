var express = require('express');
var router = express.Router();

//return the whole html index file( the whole app)
router.get('/connectfour', function (req, res, next) {
    res.render('index');
});

//get the sid from the response
router.get('/connectfour/api/v1/sids', function (req, res, next) {

});

//get a meta object from the response
router.get('/connectfour/api/v1/meta', function (req, res, next) {

});

//get a list of font objects: [font]
router.get('/connectfour/api/v1/meta/fonts', function (req, res, next) {

});

// get the list of all the games.
router.get('/connectfour/api/v1/:sid', function (req, res, next) {

});

// create a new game with this sid.
router.post('/connectfour/api/v1/:sid', function (req, res, next) {

});

// get the game object with the specific sid and gid
router.get('/connectfour/api/v1/:sid/:gid', function (req, res, next) {

});

//get the game object by this move. move is a query param
router.post('/connectfour/api/v1/:sid/:gid/move', function (req, res, next) {

});

module.exports = router;
