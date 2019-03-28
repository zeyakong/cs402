//############ global variables ############
let user;
let metadata;
let gameObj;
let csrfToken;

// ############ functions ##############

/**
 * This function only for the canvas shows the matrix login style.
 * Idea from: https://github.com/zeyakong/verbatimAnim
 */
window.onload = function () {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let W = screen.width;
    let H = screen.height;
    canvas.width = W;
    canvas.height = H;
    //set the login form at the my-auto
    $("#login_info").css('margin-top',"-"+H/1.3+"px");

    let fontSize = 20;
    let columns = Math.floor(W / fontSize);
    let drops = [];
    for (let i = 0; i < columns; i++) {
        drops.push(0);
    }

    let str = "The Matrix has you 01";

    function draw() {
        context.fillStyle = "rgba(0,0,0,0.05)";
        context.fillRect(0, 0, W, H);
        context.font = "700 " + fontSize + "px  Console";
        context.fillStyle = "#00cc33";
        for (let i = 0; i < columns; i++) {
            let index = Math.floor(Math.random() * str.length);
            let x = i * fontSize;
            let y = drops[i] * fontSize;
            context.fillText(str[index], x, y);
            if (y >= canvas.height && Math.random() > 0.99) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    draw();
    setInterval(draw, 30);
};



//init function
$(document).ready(function () {
    setPage('login');
    //check the localStorage.
    let storedUser = JSON.parse(localStorage.getItem('user'));
    let storedCSRF = localStorage.getItem('csrfToken');
    if (storedCSRF && storedUser) {
        // already logged in
        csrfToken = storedCSRF;
        user = storedUser;
        getGameList();
    }
    $("#login_form").submit((e) => {
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
    loadMetadata();
    $("#username_msg").text("Hello: " + user.email);
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
        url: '/connect4/api/v2/users/' + user._id + '?color=' + encodeURIComponent(colorValue),
        method: 'POST',
        data: {
            "playerTokenId": playerTokenId,
            "computerTokenId": computerTokenId
        },
        headers: {
            'X-CSRF': csrfToken
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
            $("#color").val(user.default.color);
            let playerTokenSelector = $("#player_token");
            let computerTokenSelector = $("#computer_token");
            playerTokenSelector.empty();
            computerTokenSelector.empty();
            for (var i = 0; i < data.tokens.length; i++) {
                playerTokenSelector.append("<option value=" + data.tokens[i].id + ">" + data.tokens[i].name + "</option>");
                computerTokenSelector.append("<option value=" + data.tokens[i].id + ">" + data.tokens[i].name + "</option>");
            }
            playerTokenSelector.val(user.default.playerToken.id);
            computerTokenSelector.val(user.default.computerToken.id);
            updateToken();
        }
    })
}

function getGameList() {
    $.ajax({
        url: '/connect4/api/v2/users/' + user._id,
        method: 'GET',
        headers: {
            'X-CSRF': csrfToken
        },
        success: function (data) {
            // a list of game objects
            showGameList(data);
        },
        error: (data) => {
            // unauthenticated request. clean all cache
            gameObj = null;
            user = null;
            csrfToken = null;
            localStorage.clear();
        }
    })
}

//use sid and gid to get the current game object by using ajax.
function getGame(gid) {
    $.ajax({
        url: '/connect4/api/v2/users/' + user._id + '/gids/' + gid,
        method: 'GET',
        headers: {
            'X-CSRF': csrfToken
        },
        success: function (data) {
            showGameDetail(data);
        }
    })
}

//a post method to make a move by using ajax
function makeAMove(move) {
    $.ajax({
        url: '/connect4/api/v2/users/' + user._id + '/gids/' + gameObj._id + '?move=' + move,
        method: 'POST',
        headers: {
            'X-CSRF': csrfToken
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
            if (data) {
                $("#email").val("");
                $("#password").val("");
                user = data;
                csrfToken = request.getResponseHeader('X-CSRF');
                //store it into localStorage
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('csrfToken', csrfToken);
                getGameList();
            } else {
                alert('Server inner error! the user object is null');
            }
        },
        error: (data) => {
            //invalid inputs
            $("#password").val("");
            $("#login_msg").text(data.responseJSON.msg);
            //clean all cache
            gameObj = null;
            user = null;
            csrfToken = null;
            localStorage.clear();
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
            user = null;
            csrfToken = null;
            localStorage.clear();
        }
    })
}

function updateTheme() {
    //get new theme info
    let playerTokenId = $("#player_token").val();
    let computerTokenId = $("#computer_token").val();
    let color = $("#color").val();
    //ajax call
    $.ajax({
        url: '/connect4/api/v2/users/' + user._id + '/default',
        method: 'PUT',
        headers: {
            'X-CSRF': csrfToken
        },
        data: {
            'color': color,
            'playerToken': JSON.stringify(findToken(playerTokenId)),
            'computerToken': JSON.stringify(findToken(computerTokenId))
        },
        success: function (data) {
            alert("successfully saved.");
            //update local metadata
            user.default = data;
            localStorage.setItem('user', JSON.stringify(user));
            getGameList();
        }
    })
}

function findToken(id) {
    if (metadata) {
        let tokens = metadata.tokens;
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].id === id) {
                return tokens[i];
            }
        }
    } else {
        return null;
    }
}