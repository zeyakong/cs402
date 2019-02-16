
//############ global variables ############
var sid = {};
var metadata;



// ############ functions ##############
$( document ).ready(function() {
    loadMetadata();
});



//################## ajax #################
function createNewGame() {
    alert(metadata);
    // $.ajax({
    //     url: '',
    //     method: '',
    //     data:{
    //
    //     },
    //     dataType: 'json',
    //     success: function (data) {
    //         console.log(data)
    //     }
    // })
}

function loadMetadata() {
    $.ajax({
        url: '/connectfour/api/v1/meta',
        method: 'GET',
        success: function (data) {
            metadata = data;
            $("#color").val(metadata.default.color);
        }
    })
}