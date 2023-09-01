let blacklistedURLs = []

window.addEventListener('load', function () {
    chrome.tabs.getSelected(null, function (tab) {
        // myURL=tab.url;
        sessionStorage.setItem('tabsEntered', sessionStorage.getItem('tabsEntered') + 1)
    });
})