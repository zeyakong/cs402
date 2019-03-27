//############ global variables ############
var uid;
var metadata;
var gameObj;
var csrfToken;

// ############ functions ##############
//init function
$(document).ready(function () {
    loadMetadata();
    setPage('login');
    //check the localStorage.


    $("#login_form").submit((e)=>{
        //prevent Default functionality
        e.preventDefault();
        login();
    });
});




function showGameControl(game) {
    var gameControl = $("#game_control");
    gameControl.empty();
    if (game.status === "LOSS") {
        gameControl.append("<img src='/assets/cry.gif' class='gameStatusPic'>");
    } else if (game.status === "VICTORY") {
        gameControl.append("<img src='/assets/winner.gif' class='gameStatusPic'>");
    } else if (game.status === "TIE") {
        gameControl.append("<div class='gameStatusPic'><h1 class='mt-4'>TIE</h1></div>");
    } else {
        for (var i = 0; i < 7; i++) {
            gameControl.append("<div value='" + i + "' class='tokenSlot' onmouseover='show(this)' onmouseleave='hide(this)' onclick='move(this)'><img class='tokenImg customHide' src='" + game.theme.playerToken.url + "'></div>");
        }
    }
}

//show the token picture
function show(content) {
    $(content).children("img").css('visibility', 'visible');
}

//hide the token picture
function hide(content) {
    $(content).children("img").css('visibility', 'hidden');
}

//move function for game_board click action
function move(content) {
    var move = $(content).attr("value");
    //validate the move
    if (gameObj.grid[0][move] !== ' ') {
        alert('Invalid move!');
    } else {
        makeAMove(move);
    }
}

function showGameBoard(game) {
    $("#game_status").text(game.status);
    var gameBoard = $("#game_board").empty();
    gameBoard.css('background-color', game.theme.color);
    for (var i = 0; i < game.grid.length; i++) {
        for (var j = 0; j < game.grid[i].length; j++) {
            if (game.grid[i][j] === "X") {
                gameBoard.append("<div class='tokenSlot'><img class='tokenImg' src='" + game.theme.playerToken.url + "'></div>");
            } else if (game.grid[i][j] === "O") {
                gameBoard.append("<div class='tokenSlot'><img class='tokenImg' src='" + game.theme.computerToken.url + "'></div>");
            } else {
                gameBoard.append("<div class='tokenSlot'><div class='tokenImg'></div></div>");
            }
        }
    }
}

function setPage(content) {
    if (content === 'game') {
        $("#main_page").hide();
        $("#game_detail").show();
        $("#login_page").hide();
    } else if (content === 'main') {
        $("#main_page").show();
        $("#game_detail").hide();
        $("#login_page").hide();
    } else {
        $("#main_page").hide();
        $("#game_detail").hide();
        $("#login_page").show();
    }
}

//This function shows the object game by drawing the chess board.
function showGameDetail(game) {
    setPage('game');
    gameObj = game;
    showGameControl(game);
    showGameBoard(game)
}

//show the list of games in main content in index.html page.
function showGameList(data) {
    setPage('main');
    $("#tbody_id").empty();
    for (var i = 0; i < data.length; i++) {
        $("#game_list").append("<tr>" +
            "<td>" + data[i].status + "</td>" +
            "<td><img class='icon avatar' src='" + data[i].theme.playerToken.url + "'></td>" +
            "<td><img class='icon avatar' src='" + data[i].theme.computerToken.url + "'></td>" +
            "<td>" + data[i].start + "</td>" +
            "<td>" + data[i].finish + "</td>" +
            "<td><button class=\"btn btn-sm\" style='background-color: " + data[i].theme.color + "' onclick='getGame(\"" + data[i]._id + "\")'>view</button></td>" +
            "</tr>");
    }
}

//This function will update the html page: playerToken and computerToken status.
function updateToken() {
    var playerToken = $("#player_token");
    var computerToken = $("#computer_token");
    var playerTokenValue = playerToken.val();
    var computerTokenValue = computerToken.val();
    computerToken.children().attr('disabled', false);
    playerToken.children().attr('disabled', false);
    computerToken.children('option[value="' + playerTokenValue + '"]').attr('disabled', true);
    playerToken.children('option[value="' + computerTokenValue + '"]').attr('disabled', true);
}


//################## ajax #################
function createNewGame() {
    var colorValue = $("#color").val();
    var playerTokenId = $("#player_token").val();
    var computerTokenId = $("#computer_token").val();
    $.ajax({
        //colorValue is a special value start with #.So, must encoded
        url: '/connect4/api/v2/users/' + uid + '?color=' + encodeURIComponent(colorValue),
        method: 'POST',
        data: {
            "playerTokenId": playerTokenId,
            "computerTokenId": computerTokenId
        },
        headers:{
            'X-CSRF':csrfToken
        },
        dataType: 'json',
        success: function (data) {
            // a specific game object
            showGameDetail(data);
        }
    })
}

function loadMetadata() {
    $.ajax({
        url: '/connect4/api/v2/meta',
        method: 'GET',
        success: function (data) {
            metadata = data;
            $("#color").val(metadata.default.color);
            var playerTokenSelector = $("#player_token");
            var computerTokenSelector = $("#computer_token");
            for (var i = 0; i < data.tokens.length; i++) {
                playerTokenSelector.append("<option value=" + data.tokens[i].id + ">" + data.tokens[i].name + "</option>");
                computerTokenSelector.append("<option value=" + data.tokens[i].id + ">" + data.tokens[i].name + "</option>");
            }
            playerTokenSelector.val(metadata.default.playerToken.id);
            computerTokenSelector.val(metadata.default.computerToken.id);
            updateToken();
        }
    })
}

function getGameList() {
    $.ajax({
        url: '/connect4/api/v2/users/' + uid,
        method: 'GET',
        headers:{
            'X-CSRF':csrfToken
        },
        success: function (data) {
            // a list of game objects
            showGameList(data);
        }
    })
}

//use sid and gid to get the current game object by using ajax.
function getGame(gid) {
    $.ajax({
        url: '/connect4/api/v2/users/' + uid + '/gids/' + gid,
        method: 'GET',
        headers:{
            'X-CSRF':csrfToken
        },
        success: function (data) {
            showGameDetail(data);
        }
    })
}

//a post method to make a move by using ajax
function makeAMove(move) {
    $.ajax({
        url: '/connect4/api/v2/users/' + uid + '/gids/' + gameObj._id + '?move=' + move,
        method: 'POST',
        headers:{
            'X-CSRF':csrfToken
        },
        success: function (data) {
            showGameDetail(data);
        }
    })
}

function hideLoginMsg() {
    $("#login_msg").text("");
}


function login() {
    let email = $("#email").val();
    let password = $("#password").val();
    $.ajax({
        url: '/connect4/api/v2/login',
        method: 'POST',
        data: {
            'email': email,
            'password': password,
        },
        contentType: 'application/x-www-form-urlencoded',
        success: (data, textStatus, request) => {
            // correct inputs
            if(data){
                uid = data._id;
                csrfToken = request.getResponseHeader('X-CSRF');
                getGameList();
            }else{
                alert('Server inner error! the user object is null');
            }
        },
        error:(data)=>{
            //invalid inputs
            $("#login_msg").text(data.responseJSON.msg);
        }
    })
}

function logout() {
    $.ajax({
        url: '/connect4/api/v2/logout',
        method: 'POST',
        success: function (data) {
            //go login page
            setPage('login');
            //delete all variables/ empty local storage.
            gameObj = null;
            uid = null;
            csrfToken = null;
        }
    })
}