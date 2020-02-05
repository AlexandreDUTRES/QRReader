var qrCodes = [];
var tabInfos = {};

$(function(){
    getStoreInfos();
});

function getStoreInfos() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabArray){
        chrome.storage.local.get('qrCodes_' + tabArray[0].id, function(result) {
            qrCodes = result['qrCodes_' + tabArray[0].id];
            displayQrCodes();
        });

        chrome.storage.local.get('tabInfos_' + tabArray[0].id, function(result) {
            tabInfos = result['tabInfos_' + tabArray[0].id];
            displayPagesInfos();
        });
    });
}

function displayPagesInfos() {
    $("#infos-title").text(tabInfos.title);
    $("#infos-host").text(tabInfos.host);
}

function displayQrCodes() {
    var cpt = 0;

    for (var qrCode of qrCodes) {
        cpt++;

        $("#qr-div").append("<div class='col-3'><div class='image-div square border' style='background-image: url(" + qrCode.src + ")'></div></div>");
        $("#qr-div").append("<div class='data-div col-9'><p class='max-lines-2'>" + qrCode.data + "</p></div>");

        if (cpt!=qrCodes.length) {
            $("#qr-div").append("<div class='col-12 p-0'><hr/></div>");
        }
    }
}