import {incrementTime} from './modules/storage.js';

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

chrome.webNavigation.onCompleted.addListener(async () => {
    let curTab = await getCurrentTab();
    let curTabURL = new URL(curTab.url)

    await incrementTime(curTabURL.hostname);
}, filter);

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
  