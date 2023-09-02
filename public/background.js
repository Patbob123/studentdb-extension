chrome.tabs.onActivated.addListener(
    function (activeInfo) {
        chrome.tabs.get(activeInfo.tabId, function (tab) {
            // console.log(activeInfo.tabId)
        });
    }
);
const filter = {
    url: [
        // { urlMatches: 'https://www.google.com/' },
        { urlMatches: 'https://www.youtube.com/' }
    ],
};

chrome.webNavigation.onCompleted.addListener(() => {
    console.info("The user has loaded my favorite website!");
}, filter);