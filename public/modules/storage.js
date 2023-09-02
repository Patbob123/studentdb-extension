import * as time from './time.js'

const incrementTime = async (hostname) => {
    let obj = await getStorage(hostname)
    let curTime = time.getTime();

    console.log(obj,curTime)
    if (Object.keys(obj).length === 0) {
        console.log("Doesnt Exist: set to ", curTime)
        chrome.storage.local.set({
            [hostname]: { start: curTime, current: curTime }
        })
    } else {
        chrome.storage.local.set({
            [hostname]: { start: obj[hostname].start, current: curTime }
        })
    }
}

const removeStorage = async (hostname) => {
    await chrome.storage.local.remove(hostname)
}

const getStorage = async (hostname) => {
    return chrome.storage.local.get(hostname)
}

export { incrementTime, removeStorage, getStorage }