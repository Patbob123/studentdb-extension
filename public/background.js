import { incrementTime, getStorage, setStorage, startCooldown, newStorage, getCurrentTab, clearStorage, sendNoti } from './modules/storage.js';
import * as time from './modules/time.js'

const defaultSettings = {
    // maxTime: 3600,
    maxTime: 10,
    trackedHosts: ['www.amazon.com', 'www.youtube.com', 'www.netflix.com']
}

chrome.runtime.onInstalled.addListener(e => {
    console.log('Starting')
    sendNoti("STARTING UNTANGLE", "UNTANGLE is starting")
    let start = async () => {
        await clearStorage()
        await setStorage('settings', defaultSettings)
        await repeatTimer(0);
    }
    start();
})

chrome.declarativeNetRequest.updateDynamicRules({ // Testing purposes, to remove website blocks on first load from previous runs
    removeRuleIds: [0, 1, 2, 3, 4, 5, 6]
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
            if(!obj.settings.trackedHosts.includes(host)) continue;
            
            if (obj[host].timeSpent < 0) curTabURL = host
            if (obj[host].timeSpent >= 0) {
                chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: [obj[host].id]
                });
            }
            if (curTabURL == host || obj[host].timeSpent < 0) {
                await incrementTime(curTabURL, newTime - prevTime)

                let maxTime = obj.settings.maxTime
                console.log(newTime - prevTime, obj[curTabURL])

                if (obj[curTabURL].timeSpent >= maxTime) {
                    await chrome.declarativeNetRequest.updateDynamicRules({
                        addRules: [{
                            id: obj[curTabURL].id,
                            action: { type: 'redirect', redirect: { extensionPath: '/index.html' } },
                            condition: { urlFilter: `||${curTabURL}/`, resourceTypes: ['main_frame', 'sub_frame'] },
                        }],
                    });
                    sendNoti("UNTANGLED", host + " has been blocked. Go back to Learning!!!")
                    await chrome.tabs.reload(curTab.id)
                    await startCooldown(curTabURL, obj[curTabURL].id, maxTime)
                }
            }

        }

        if (obj.settings.trackedHosts.includes(curTabURL) && !obj[curTabURL]) {
            newStorage(curTabURL)
        }

    }
    console.log('EHadsaERRERE')
    await new Promise(resolve => setTimeout(resolve, 1000));
    repeatTimer(newTime)
}