//############ global variables ############
var sid;
var metadata;


// ############ functions ##############
//init function
$(document).ready(function () {
    loadMetadata();
    if(!sid){
        getSID();
    }
});

function showGameList(data) {
    $("#tbody_id").empty();
    for(var i=0;i<data.length;i++){
        console.log(i+"add one row");
        $("#game_list").append("<tr>\n" +
            "            <td>"+data[i].status+"</td>\n" +
            "            <td>"+data[i].theme.playerToken+"</td>\n" +
            "            <td>"+data[i].theme.computerToken+"</td>\n" +
            "            <td>"+data[i].start+"</td>\n" +
            "            <td>"+data[i].finish+"</td>\n" +
            "            <td><button class=\"btn btn-warning btn-sm\">view</button></td>\n" +
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
            "playerToken": playerTokenId,
            "computerToken": computerTokenId
        },
        dataType: 'json',
        success: function (data) {
            // a specific game object
            // console.log(data);
            getGameList();
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
            $("#player_token").val(metadata.default.playerToken.name);
            $("#computer_token").val(metadata.default.computerToken.name);
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
            console.log(data);
            showGameList(data);
        }
    })
}