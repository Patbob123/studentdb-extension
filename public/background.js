import { incrementTime, getStorage, startCooldown, newStorage, getCurrentTab } from './modules/storage.js';
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

// chrome.webNavigation.onCompleted.addListener(async () => {
// }, filter);

const trackedHosts = ['www.amazon.com', 'www.youtube.com', 'www.netflix.com'];

chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [0,1,2,3,4,5,6]
});

let repeatTimer = async (prevTime) => {
    let curTab = await getCurrentTab();
    let newTime = time.getTime(); //Even though newTime is always changing, the difference between newTime and prevTime will always be 1 second +await times

    if (curTab) {
        console.log('EHadsaERRERE')
        let curTabURL = new URL(curTab.url).hostname
        let obj = await getStorage()
        console.log(obj)

        for (let host in obj) {

            if (obj[host].timeSpent < 0) curTabURL = host
            if (obj[host].timeSpent >= 0) {
                chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: [obj[host].id]
                });
            }
            if (curTabURL == host || obj[host].timeSpent < 0) {
                await incrementTime(curTabURL, newTime - prevTime)

                let maxTime = 10
                console.log(newTime - prevTime, obj[curTabURL])

                if (obj[curTabURL].timeSpent >= 10) {
                    await chrome.declarativeNetRequest.updateDynamicRules({
                        addRules: [{
                            id: obj[curTabURL].id,
                            action: { type: 'redirect', redirect: { extensionPath: '/index.html' } },
                            condition: { urlFilter: `||${curTabURL}/`, resourceTypes: ['main_frame', 'sub_frame'] },
                        }],
                    });
                    await chrome.tabs.reload(curTab.id)
                    await startCooldown(curTabURL, obj[curTabURL].id, maxTime)
                }

                chrome.notifications.create("timer",
                    {
                        iconUrl: "https://img.icons8.com/fluency/48/domain.png",
                        title: "Time Passed",
                        type: "basic",
                        message: obj[curTabURL].timeSpent.toString(),
                        priority: 2
                    }
                )
                console.log('EHERRERE')
            }

        }

        if(trackedHosts.includes(curTabURL) && !obj[curTabURL]) {
            newStorage(curTabURL)
        }

    }
    console.log('EHadsaERRERE')
    await new Promise(resolve => setTimeout(resolve, 1000));
    repeatTimer(newTime)
}

chrome.runtime.onInstalled.addListener(e => {
    console.log('EHERRERE')
    repeatTimer(0);

})

// MAKE CONFIG JSON (does this work on client side??) OR USE LOCAL STORAGE