
//############ global variables ############
var sid;
var metadata;



// ############ functions ##############
$( document ).ready(function() {
    loadMetadata();
    getSID();
});

function changeToken() {
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
    $.ajax({
        url: '',
        method: 'POST',
        data:{

        },
        dataType: 'json',
        success: function (data) {
            console.log(data)
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
            changeToken();
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