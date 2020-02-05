const logoBase64 = "data:image/png;base64,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";
var documentInfos = {
    'title': '',
    'host': ''
};
var srcArray = [];
const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

window.onload = function () {
    var myLogoDiv = document.createElement('div');
    myLogoDiv.id = "QRReaderLogo";
    myLogoDiv.style.position = 'fixed';
    myLogoDiv.style.right = '10px';
    myLogoDiv.style.bottom = '10px';
    myLogoDiv.style.width = '50px';
    myLogoDiv.style.height = '50px';
    myLogoDiv.style.zIndex = '1000';
    myLogoDiv.style.border = '2px solid black';

    var myLogoImg = document.createElement('img');
    myLogoImg.style.width = "100%";
    myLogoImg.src = logoBase64;

    myLogoDiv.appendChild(myLogoImg);

    document.body.appendChild(myLogoDiv);
}


documentInfos.title = document.title;
documentInfos.host = document.location.host;

chrome.runtime.sendMessage({text: "tabInfos", infos: documentInfos});

document.addEventListener('DOMSubtreeModified', modifiedCallback);

function modifiedCallback(event) {
    var childImg = [];
    var newImages = [];

    var tagName = event.target.tagName;
    var tmpSrc = "";

    if (event.target.getElementsByTagName) childImg = event.target.getElementsByTagName('img');

    if (tagName && (tagName == 'img' || tagName == 'IMG')) {
        tmpSrc = testImageSize(event.target);
        if (tmpSrc.length) newImages = newImages.concat(tmpSrc);
    }

    if (childImg.length) {
        for (var img of childImg) {
            tmpSrc = testImageSize(img);
            if (tmpSrc.length) newImages = newImages.concat(tmpSrc);
        }
    }

    newImages = newImages.concat(srcArray);
    newImages = [...new Set(newImages)];

    if (newImages.length != srcArray.length) {
        srcArray = newImages;
        chrome.runtime.sendMessage({'text': 'scrapSrc', array: srcArray});
    }
}

function testImageSize(elem) {
    if (elem.src.match(urlRegex) && elem.width > 200 && elem.height > 200) {
        return elem.src;
    } else return "";
}
