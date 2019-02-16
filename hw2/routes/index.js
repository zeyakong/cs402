var express = require('express');
var uuid = require('uuid');
var router = express.Router();
var path = require('path');

//######### variables & constructors ###########

function Token(id, name,url) {
    this.id = id;
    this.name=name;
    this.url = url;
}

var theme = {
    color: "",
    playerToken: "",
    computerToken: ""
};

var metadata = {
    tokens: [],
    default: theme
};

function Game(them,id,status,start,finish,grid){
    this.theme= theme;
    this.id = id;
    this.status=status;
    this.start =  start;
    this.finish= finish;
    this.grid= grid;
}

var error = {
    msg: ""
};

var GameDB = {};
//################ functions ####################


//################ routers ######################
//return the whole html index file( the whole app)
router.get('/connectfour', function (req, res, next) {
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

//get the sid from the response
router.get('/connectfour/api/v1/sids', function (req, res, next) {
    res.setHeader('X-sid',uuid.v4());
    res.send();
});

//get a meta object from the response
router.get('/connectfour/api/v1/meta', function (req, res, next) {
    metadata.default.color = "#ff0000"; //red
    var tokenList = [new Token("t1","t one","url t1"),new Token("2","t two","url t2")];
    metadata.default.playerToken = tokenList[0];
    metadata.default.computerToken = tokenList[1];
    metadata.tokens = tokenList;
    res.send(metadata);
});

// get the list of all the games.
router.get('/connectfour/api/v1/sids/:sid', function (req, res, next) {

});

// create a new game with this sid.
router.post('/connectfour/api/v1/sids/:sid', function (req, res, next) {

});

//This endpoint delivers the game associated with the specified SID and having the specified game id.
router.get('/connectfour/api/v1/sids/:sid/gids/:gid', function (req, res, next) {

});

//get the game object by this move. move is a query param
router.post('/connectfour/api/v1/sids/:sid/gids/:gid', function (req, res, next) {

});

module.exports = router;
