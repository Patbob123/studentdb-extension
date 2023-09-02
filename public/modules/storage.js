import * as time from './time.js'

const incrementTime = async (hostname, increment) => {
    let obj = await getStorage()
    console.log(obj)
    let curTime = time.getTime();

    console.log(obj,curTime)
    if (Object.keys(obj).length === 0) {
        console.log("Doesnt Exist: set to ", 0)
        chrome.storage.local.set({
            // [hostname]: { start: curTime, current: curTime }
            [hostname]: 0
        })
    } else {
        chrome.storage.local.set({
            // [hostname]: { start: obj[hostname].start, current: curTime }
            [hostname]: obj[hostname]+increment
        })
    }
}

const removeStorage = async (hostname) => {
    await chrome.storage.local.remove(hostname)
}

const getStorage = async () => {
    return chrome.storage.local.get()
}

const clearStorage = async () => {
    console.log("WORKED")
    return chrome.storage.local.clear();
}

export { incrementTime, removeStorage, getStorage, clearStorage }