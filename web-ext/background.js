function openCanvas() {
    browser.tabs.create({
        "url": "https://canvas.unl.edu/"
    });
}

browser.browserAction.onClicked.addListener(openCanvas);