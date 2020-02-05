function sendHttpRequest(url, method, body, next) {
    $.ajax({
        type: method,
        url: url,
        data: body || {},
        dataType: "json",
        success: function (result) {
            return next(result);
        },
        error: function () {
            return next();
        }
    });
}

function checkSrc(srcArray, next) {
    var finalArray = [];

    async.eachLimit(srcArray, 5, function (src, callback) {
        sendHttpRequest("https://api.qrserver.com/v1/read-qr-code", "GET", {
            fileurl: src
        }, function (response) {
            if (response && response.length && response[0].symbol[0].data) {
                finalArray.push({ 'src': src, 'data': response[0].symbol[0].data });
            }
            return callback();
        });
    }, function () {
        return next(finalArray);
    });
}

function createPopup(tabId, qrCodes) {
    var jsonStore = {};
    jsonStore['qrCodes_' + tabId] = qrCodes;

    chrome.storage.local.set(jsonStore, function () {
        chrome.browserAction.setPopup({
            popup: "popup.html",
            tabId: tabId
        });
    });
}

function setIconTab(tabId, textBadge) {
    chrome.browserAction.setBadgeText({
        text: textBadge,
        tabId: tabId
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.text == "scrapSrc") {
        checkSrc(request.array, function (qrCodes) {
            if (qrCodes.length) {
                setIconTab(sender.tab.id, qrCodes.length.toString());
                createPopup(sender.tab.id, qrCodes);
            }
        });
        return sendResponse();
    }
    else if (request.text == "tabInfos") {
        var jsonStore = {};
        jsonStore['tabInfos_' + sender.tab.id] = request.infos;
        chrome.storage.local.set(jsonStore);
        return sendResponse();
    } else return true;
});