import * as time from './time.js'

const incrementTime = async (hostname, increment) => {
    let obj = await getStorage()
    console.log(obj)
    let curTime = time.getTime();

    if (Object.keys(obj).length === 0) {
    } else {
        chrome.storage.local.set({
            // [hostname]: { start: obj[hostname].start, current: curTime }
            [hostname]: { id: obj[hostname].id, timeSpent: obj[hostname].timeSpent + increment }
        })
    }
}

const removeStorage = async (hostname) => {
    await chrome.storage.local.remove(hostname)
}

const getStorage = async () => {
    return chrome.storage.local.get()
}

const setStorage = async (hostname, val) => {
    chrome.storage.local.set({
        [hostname]: val
    })
}

const setSettings = async (settings) => {
    let obj = await getStorage()

    if (settings.maxTime) {
        await setStorage('settings', { maxTime: settings.maxTime, trackedHosts: obj.settings.trackedHosts })
    }
    if (settings.trackedHosts) {
        await setStorage('settings', { trackedHosts: settings.trackedHosts, maxTime: obj.settings.maxTime })
    }

}

const newStorage = async (hostname) => {
    let obj = await getStorage()
    console.log("Doesnt Exist: set to ", 0)

    let oldIds = []
    for (let host in obj) {
        oldIds.push(obj[host].id)
    }
    oldIds.sort();
    let newId = oldIds[oldIds.length - 1] + 1
    console.log(oldIds, newId)
    chrome.storage.local.set({
        [hostname]: { id: newId ? newId : 1, timeSpent: 0 }
    })
}

const startCooldown = async (hostname, id, val) => {
    setStorage(hostname, { id: id, timeSpent: val * -1 })
}

const clearStorage = async () => {
    chrome.storage.local.clear();
}

const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

const sendNoti = async (title, message) => {
    chrome.notifications.create(title,
        {
            iconUrl: "../assets/icon16.png",
            title: title,
            type: "basic",
            message: message,
            priority: 2
        }
    )
}

export { incrementTime, removeStorage, getStorage, setStorage, newStorage, setSettings, startCooldown, clearStorage, getCurrentTab, sendNoti }