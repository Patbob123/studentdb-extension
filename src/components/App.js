import { getStorage, removeStorage, clearStorage, getCurrentTab } from "../modules/storage.js";
import * as time from '../modules/time.js'


function App() {
    let [hostname, setHostname] = React.useState(0)
    let [curTime, setTime] = React.useState(0)
    let [maxTime, setMaxTime] = React.useState(0)
    let [barPercent, setBarPercent] = React.useState(0)
    
    let [isEnabled, setEnabled] = React.useState(true)
    let [onMain, setOnMain] = React.useState(true)

   

    React.useEffect(()  => {
        let getData = async () => {
            let curTab = await getCurrentTab();
            if(curTab){

                let curTabHostname = new URL(curTab.url).hostname
                setHostname(curTabHostname)

                let storage = await getStorage()
                let date = new Date(null);
                date.setSeconds(storage[curTabHostname].timeSpent);
                setTime(date.toISOString().substr(11, 8))

                date = new Date(null);
                date.setSeconds(storage.settings.maxTime);
                setMaxTime(date.toISOString().substr(11, 8))

                setBarPercent((storage[curTabHostname].timeSpent / storage.settings.maxTime) * 100 +"%")
                console.log(storage[curTabHostname])
                console.log(curTime) 
            }
        }
        getData();
    }, [curTime]);

    function toggleEnable(isEnabled){
        setEnabled(!isEnabled)
    }

    function toggleList(onMain){
        setOnMain(!onMain)
    }

    function changeMaxTime(onMain){
        setOnMain(!onMain)
    }

    return (
        <>
            { onMain ? (
            
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

                { isEnabled ? (
                    <>
                    <div className="flex flex-col w-full h-1/5 px-5 space-y-1 justify-center">
                        <div className="h-fit w-full bg-neutral-20">
                            <div className="font-bold text-xs/none text-white">
                                {hostname}
                            </div>
                        </div>
                        <div className="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-600">
                            <div className="h-2 rounded bg-green-500" style={{width: barPercent}}></div>
                        </div>
                        <div className="h-fit w-full bg-neutral-20">
                            <div className="font-bold text-xs/none text-white">
                                {curTime} / {maxTime}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full h-1/3 px-5 space-y-2 justify-center">
                        <div className="flex justify-between h-1/3 space-x-2 font-bold text-xs/none text-white">
                            <input  type="number" placeholder="HOUR" className="h-full w-1/4 rounded p-1 placeholder-black focus:outline-none focus:border-red-500 bg-slate-500"/>
                            <input  type="number" placeholder="MINUTE" className="h-full w-1/4 rounded p-1 placeholder-black focus:outline-none focus:border-red-500  bg-slate-500"/>
                            <input  type="number" placeholder="SECOND" className="h-full w-1/4 rounded p-1 placeholder-black focus:outline-none focus:border-red-500  bg-slate-500"/>
                        </div>
                        <div onClick={async () => await removeStorage("www.youtube.com")} className="h-1/4 rounded  bg-yellow-50">
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
                        <div onClick={() => toggleList(onMain)} className="text-white">{">"}</div>
                    </div>
                    </>
                ):(
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
                        <div onClick={() => toggleList(onMain)} className="text-white">{">"}</div>
                    </div>
                    </>
                )}
                
            </div>
            ):(
            <>
                <div className="w-80 h-90 bg-slate-900 py-5 pb-10 whitespace-none overflow-y-auto">
                        <div className="flex flex-col w-full h-1/5 px-5 space-y-1 justify-center">
                            <div className="h-fit w-full bg-neutral-20 font-bold text-xs/none text-white">
                                www.faecbooke.com
                            </div>
                            <div className="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-600">
                                <div className="h-2 rounded bg-red-600" style={{width:"100%"}}></div>
                            </div>
                            <div className="h-fit w-full bg-neutral-20 font-bold text-xs/none text-white">
                                13:32 / 20:00
                            </div>
                        </div>
                        
                </div>
                <div className="flex fixed w-full h-8 bottom-0 px-5 pb-2 bg-slate-900">
                    <div onClick={() => toggleList(onMain)} className="text-white">{"<"}</div>
                </div>
            </>
            )}
    </>
    );
    
}




ReactDOM.createRoot(document.querySelector('#root')).render(<App />);