import { getStorage, removeStorage, clearStorage, getCurrentTab, setSettings } from "../modules/storage.js";
import * as time from '../modules/time.js'


function App() {
    let [hostname, setHostname] = React.useState(0)
    let [curTime, setTime] = React.useState(0)
    let [maxTime, setMaxTime] = React.useState(0)
    let [barPercent, setBarPercent] = React.useState(0)

    let [isEnabled, setEnabled] = React.useState(true)
    let [onMain, setOnMain] = React.useState(true)

    let [hour, setHour] = React.useState(0)
    let [minute, setMinute] = React.useState(0)
    let [second, setSecond] = React.useState(0)

    let [hostArr, setHostArr] = React.useState(0)

    let storage;

    React.useEffect(() => {
        let getData = async () => {
            let curTab = await getCurrentTab();
            if (curTab) {

                let curTabHostname = new URL(curTab.url).hostname
                setHostname(curTabHostname)

                storage = await getStorage()

                let hostNameArr = [];
                for (let i in storage.settings.trackedHosts) {
                    console.log(i)
                    let curHost = storage.settings.trackedHosts[i]
                    if (storage[curHost]) {
                        let date = new Date(null);
                        date.setSeconds(storage[curHost].timeSpent);
                        let timeSpentDisplay = date.toISOString().substr(11, 8)

                        date = new Date(null);
                        date.setSeconds(storage.settings.maxTime);
                        let maxTimeDisplay = date.toISOString().substr(11, 8)

                        let barPercentDisplay = (Math.abs(storage[curHost].timeSpent) / storage.settings.maxTime) * 100 + "%"
                        console.log(storage[curHost])
                        console.log(curTime)

                        hostNameArr.push({ hostname: curHost, timeSpent: timeSpentDisplay, maxTime: maxTimeDisplay, barPercent: barPercentDisplay })
                    }
                }
                console.log(hostNameArr)
                setHostArr(hostNameArr)

                if (storage[curTabHostname]) {
                    let date = new Date(null);
                    date.setSeconds(storage[curTabHostname].timeSpent);
                    setTime(date.toISOString().substr(11, 8))

                    date = new Date(null);
                    date.setSeconds(storage.settings.maxTime);
                    setMaxTime(date.toISOString().substr(11, 8))

                    setBarPercent((Math.abs(storage[curTabHostname].timeSpent) / storage.settings.maxTime) * 100 + "%")
                    console.log(storage[curTabHostname])
                    console.log(curTime)
                }
            }
        }
        getData();
    }, [curTime]);

    function toggleEnable(isEnabled) {
        setEnabled(!isEnabled)
    }

    function toggleList(onMain) {
        console.log(hostArr)
        setOnMain(!onMain)
    }

    async function changeMaxTime() {
        let timeInSeconds = hour * 3600 + minute * 60 + second
        await setSettings({ maxTime: timeInSeconds })
    }

    return (
        <>
            {onMain ? (

                <div className="flex flex-col justify-between w-80 h-72 bg-slate-900">
                    <div className="flex w-full h-1/3 px-5 py-4 space-x-4 ">
                        <div className="flex-none items-center w-16 h-16">
                            <img src="./assets/icon128.png" alt="Icon" className=""></img>
                        </div>
                        <div className="flex flex-1 w-auto h-16 items-center justify-center">
                            <div className="font-extrabold text-3xl text-transparent text-center bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600 duration-700">
                                UNTANGLE
                            </div>

                        </div>
                    </div>

                    {isEnabled ? (
                        <>
                            <div className="flex flex-col w-full h-1/5 px-5 space-y-1 justify-center">
                                <div className="h-fit w-full bg-neutral-20">
                                    <div className="font-bold text-xs/none text-white">
                                        {hostname}
                                    </div>
                                </div>
                                <div className="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-600">
                                    <div className="h-2 rounded bg-green-500" style={{ width: barPercent }}></div>
                                </div>
                                <div className="h-fit w-full bg-neutral-20">
                                    <div className="font-bold text-xs/none text-white">
                                        {curTime} / {maxTime}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col w-full h-1/3 px-5 space-y-2 justify-center">
                                <div className="flex justify-between h-1/3 space-x-2 font-bold text-xs/none text-white">
                                    <input type="number" min="0" max="99" onChange={(e) => setHour(e.target.value)} placeholder="HOUR" className="h-full w-1/4 rounded p-1 placeholder-black focus:outline-none focus:border-red-500 bg-slate-500" />
                                    <input type="number" min="0" max="59" onChange={(e) => setMinute(e.target.value)} placeholder="MINUTE" className="h-full w-1/4 rounded p-1 placeholder-black focus:outline-none focus:border-red-500  bg-slate-500" />
                                    <input type="number" min="0" max="59" onChange={(e) => setSecond(e.target.value)} placeholder="SECOND" className="h-full w-1/4 rounded p-1 placeholder-black focus:outline-none focus:border-red-500  bg-slate-500" />
                                </div>
                                <div onClick={async () => await changeMaxTime()} className="h-1/4 rounded  bg-yellow-50">
                                    <div className="flex font-extrabold text-base justify-center items-center">
                                        SET
                                    </div>
                                </div>

                            </div>
                            <div className="flex w-full h-1/10 bottom-0 px-5 pb-2 justify-between">
                                <div onClick={() => toggleEnable(isEnabled)} className="w-1/4 rounded  bg-yellow-50">
                                    <div className="flex font-extrabold justify-center items-center">
                                        DISABLE
                                    </div>
                                </div>
                                <div onClick={() => toggleList(onMain)} className="w-1/10 font-extrabold text-black text-center rounded bg-white">{">"}</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col w-full h-1/2 p-5 space-y-1 justify-center">
                                <div className="h-1/4 flex justify-center items-center font-extrabold text-2xl/none text-white">
                                    {hostname}
                                </div>
                                <div className="h-1/2 flex justify-center items-center font-extrabold text-xl/none text-red-500">
                                    NOT ENABLED
                                </div>
                            </div>
                            <div className="flex w-full h-1/10 bottom-0 px-5 pb-2 justify-between">
                                <div onClick={() => toggleEnable(isEnabled)} className="w-1/4 rounded  bg-yellow-50">
                                    <div className="flex font-extrabold justify-center items-center">
                                        ENABLE
                                    </div>
                                </div>
                                <div onClick={() => toggleList(onMain)} className="w-1/10 font-extrabold text-black text-center rounded bg-white">{">"}</div>
                            </div>
                        </>
                    )}

                </div>
            ) : (
                <>
                    <div className="w-80 h-90 bg-slate-900 py-5 pb-10 whitespace-none overflow-y-auto">
                        {JSON.stringify(hostArr)}
                        {
                            hostArr.map((host, i) => {
                                <>
                                <div>ASDASDASD</div>
                                <div key={i} className="flex flex-col w-full h-1/5 px-5 space-y-1 justify-center">
                                    <div className="h-fit w-full bg-neutral-20 font-bold text-xs/none text-white">
                                        {host.hostname}
                                    </div>
                                    <div className="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-600">
                                        <div className="h-2 rounded bg-red-600" style={{ width: host.barPercent }}></div>
                                    </div>
                                    <div className="h-fit w-full bg-neutral-20 font-bold text-xs/none text-white">
                                        {host.timeSpent} / {host.maxTime}
                                    </div>
                                </div>
                                </>
                            })
                        }


                    </div>
                    <div className="flex fixed w-full h-8 bottom-0 px-5 pb-2 bg-slate-900">
                        <div onClick={() => toggleList(onMain)} className="w-1/10 font-extrabold text-black text-center rounded bg-white">{"<"}</div>
                    </div>
                </>
            )}
        </>
    );

}




ReactDOM.createRoot(document.querySelector('#root')).render(<App />);