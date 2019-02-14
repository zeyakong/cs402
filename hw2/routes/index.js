var express = require('express');
var uuid = require('uuid');
var router = express.Router();

//################ variables ####################
var font = {
    category: "",
    family: "",
    link: ""
};

var theme = {
    font: font,
    color: "",
    playerToken: "",
    computerToken: ""
};

var metadata = {
    fonts: [],
    tokens: [],
    default: theme
};

var game = {
    theme: theme,
    id: "",
    unoccupied: 123,
    status: "unfinished",
    timestamp: 123,
    timeToComplete: 123,
    view: [[]]
};
var error = {
    msg: ""
};

//################ routers ######################
//return the whole html index file( the whole app)
router.get('/connectfour', function (req, res, next) {
    res.render('index');
});

//get the sid from the response
router.get('/connectfour/api/v1/sids', function (req, res, next) {
    res.send(uuid.v4());
});

//get a meta object from the response
router.get('/connectfour/api/v1/meta', function (req, res, next) {
    metadata.fonts = "";
    metadata.default.color = "red";
    metadata.default.font = font;
    res.send(metadata)
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
