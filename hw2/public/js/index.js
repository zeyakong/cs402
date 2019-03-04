//############ global variables ############
var sid;
var metadata;
var gameObj;

// ############ functions ##############
//init function
$(document).ready(function () {
    loadMetadata();
    setPage('main');
    if (!sid) {
        getSID();
    }
});

function showGameControl(game) {
    var gameControl = $("#game_control");
    gameControl.empty();
    if (game.status == "LOSS") {
        gameControl.append("<img src='/assets/cry.gif' class='gameStatusPic'>");
    } else if (game.status == "VICTORY") {
        gameControl.append("<img src='/assets/winner.gif' class='gameStatusPic'>");
    } else if (game.status == "TIE") {
        gameControl.append("<div class='gameStatusPic'><h1 class='mt-4'>TIE</h1></div>");
    } else {
        for (var i = 0; i < 7; i++) {
            gameControl.append("<div value='" + i + "' class='tokenSlot' onmouseover='show(this)' onmouseleave='hide(this)' onclick='move(this)'><img class='tokenImg customHide' src='" + game.theme.playerToken.url + "'></div>");
        }
    }
}

function show(content) {
    $(content).children("img").css('visibility', 'visible');
}

function hide(content) {
    $(content).children("img").css('visibility', 'hidden');
}

function move(content) {
    var move = $(content).attr("value");
    //validate the move
    if (gameObj.grid[0][move] != ' ') {
        alert('Invalid move!');
    } else {
        makeAMove(move);
    }
}

function showGameBoard(game) {
    var gameBoard = $("#game_board").empty();
    gameBoard.css('background-color', game.theme.color);
    for (var i = 0; i < game.grid.length; i++) {
        for (var j = 0; j < game.grid[i].length; j++) {
            if (game.grid[i][j] == "X") {
                gameBoard.append("<div class='tokenSlot'><img class='tokenImg' src='" + game.theme.playerToken.url + "'></div>");
            } else if (game.grid[i][j] == "O") {
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
    } else if (content === 'main') {
        $("#main_page").show();
        $("#game_detail").hide();
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
    // console.log(data);
    setPage('main');
    $("#tbody_id").empty();
    for (var i = 0; i < data.length; i++) {
        $("#game_list").append("<tr>\n" +
            "            <td>" + data[i].status + "</td>\n" +
            "            <td><img class='icon avatar' src='" + data[i].theme.playerToken.url + "'></td>\n" +
            "            <td><img class='icon avatar' src='" + data[i].theme.computerToken.url + "'></td>\n" +
            "            <td>" + data[i].start + "</td>\n" +
            "            <td>" + data[i].finish + "</td>\n" +
            "            <td><button class=\"btn btn-sm\" style='background-color: " + data[i].theme.color + "' onclick='getGame(\"" + data[i].id + "\")'>view</button></td>\n" +
            "        </tr>");
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
        url: '/connectfour/api/v1/sids/' + sid + '?color=' + encodeURIComponent(colorValue),
        method: 'POST',
        data: {
            "playerTokenId": playerTokenId,
            "computerTokenId": computerTokenId
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
        url: '/connectfour/api/v1/meta',
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

function getSID() {
    $.ajax({
        url: '/connectfour/api/v1/sids',
        method: 'GET',
        success: function (data, textStatus, request) {
            sid = request.getResponseHeader('X-sid');
        }
    })
}

function getGameList() {
    $.ajax({
        url: '/connectfour/api/v1/sids/' + sid,
        method: 'GET',
        success: function (data) {
            // a list of game objects
            showGameList(data);
        }
    })
}

//use sid and gid to get the current game object by using ajax.
function getGame(gid) {
    $.ajax({
        url: '/connectfour/api/v1/sids/' + sid + '/gids/' + gid,
        method: 'GET',
        success: function (data) {
            showGameDetail(data);
        }
    })
}

function makeAMove(move) {
    $.ajax({
        url: '/connectfour/api/v1/sids/' + sid + '/gids/' + gameObj.id + '?move=' + move,
        method: 'POST',
        success: function (data) {
            console.log(data);
            showGameDetail(data);
        }
    })
}