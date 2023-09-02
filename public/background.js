import { incrementTime, getStorage } from './modules/storage.js';
import * as time from './modules/time.js'

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

    await incrementTime(curTabURL.hostname, 0);
    repeatTimer(time.getTime());
}, filter);

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

let repeatTimer = async (prevTime) => {
    let curTab = await getCurrentTab();
    let curTabURL = new URL(curTab.url)
    let newTime = time.getTime(); //Even though newTime is always changing, the difference between newTime and prevTime will always be 1 second +await times

    if (curTabURL.hostname == "www.youtube.com") {
        await incrementTime(curTabURL.hostname, newTime - prevTime)
        let obj = await getStorage()
        console.log(newTime - prevTime, obj[curTabURL.hostname])
        chrome.notifications.create("timer",
            {
                iconUrl: "https://img.icons8.com/fluency/48/domain.png",
                title: "Time Passed",
                type: "basic",
                message: obj[curTabURL.hostname].toString(),
                priority: 2
            }
        )
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    repeatTimer(newTime)
}