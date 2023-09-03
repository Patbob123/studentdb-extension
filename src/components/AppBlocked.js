import { getStorage, removeStorage, clearStorage, getCurrentTab, setSettings } from "../modules/storage.js";
import * as time from '../modules/time.js'


function App() {

    let [hostArr, setHostArr] = React.useState([])

    let storage;

    React.useEffect(() => {
        let getData = async () => {
            let curTab = await getCurrentTab();
            if (curTab) {

                let curTabHostname = new URL(curTab.url).hostname

                storage = await getStorage()

                let hostNameArr = [];
                for (let i in storage.settings.trackedHosts) {
                    let curHost = storage.settings.trackedHosts[i]
                    if (storage[curHost]) {
                        let cooldown = storage[curHost].timeSpent < 0
                        let date = new Date(null);
                        date.setSeconds(Math.abs(storage[curHost].timeSpent));
                        let timeSpentDisplay = date.toISOString().substr(11, 8)

                        date = new Date(null);
                        date.setSeconds(storage.settings.maxTime);
                        let maxTimeDisplay = date.toISOString().substr(11, 8)

                        let barPercentDisplay = (Math.abs(storage[curHost].timeSpent) / storage.settings.maxTime > 1) ? 1 : (Math.abs(storage[curHost].timeSpent) / storage.settings.maxTime) * 100 + "%"

                        hostNameArr.push({ hostname: curHost, timeSpent: timeSpentDisplay, maxTime: maxTimeDisplay, barPercent: barPercentDisplay, onCooldown: cooldown })
                    }
                }
                console.log(hostNameArr)
                setHostArr(hostNameArr)
            }

            await new Promise(resolve => setTimeout(resolve, 100));
            getData()
        }
        getData();
    }, []);

    return (
        <>
            <div className="w-full h-full bg-slate-900">
                <div className="flex w-full px-5 py-4 space-x-4 ">
                    <div className="flex-none items-center w-16 h-16">
                        <img src="./assets/icon128.png" alt="Icon" className=""></img>
                    </div>
                    <div className="flex flex-1 w-auto h-16 items-center justify-center">
                        <div className="font-extrabold tracking-widest text-3xl text-transparent text-center flex">
                            <div style={{ color: "#00c3b1" }}>UN</div><div style={{ color: "#ff6b65" }}>TANGLE</div>
                        </div>

                    </div>
                </div>

                <div className="bg-slate-900 p-10 space-y-2 text-white">
                    {
                        hostArr.map((host, i) =>
                            <div key={i} className="flex flex-col w-full h-64 px-5 space-y-1 justify-center">
                                <div className="h-fit w-full bg-neutral-20 font-bold text-white text-5xl">
                                    {host.hostname}
                                </div>
                                <div className="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-600">
                                    <div className={(host.onCooldown ? "bg-red-600" : "bg-green-500") + " h-2 rounded"} style={{ width: host.barPercent }}></div>
                                </div>
                                <div className="h-fit w-full bg-neutral-20 font-bold text-white text-3xl">
                                    {(host.timeSpent)} / {host.maxTime}
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
        </>
    );

}




ReactDOM.createRoot(document.querySelector('#root')).render(<App />);