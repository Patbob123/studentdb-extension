import { getStorage, removeStorage, clearStorage } from "../modules/storage.js";
import * as time from '../modules/time.js'

function App() {
    
    return (
            <div className="flex flex-col w-80 h-80 bg-slate-900">
                <div className="flex w-full h-1/3 px-5 py-4 space-x-4 ">
                    <div className="flex-none items-center w-16 h-16">
                        <img src="./assets/icon128.png" alt="Icon" className=""></img>
                    </div>
                    <div className="flex flex-1 w-auto h-16 items-center justify-center">
                        <div className="font-extrabold text-3xl text-transparent text-center bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600 duration-700">
                            UNTANGLED
                        </div>
                        
                    </div>
                </div>
                <div className="flex flex-col w-full h-1/3 px-5 space-y-1 justify-center">
                    <div className="h-fit w-full bg-neutral-20">
                        <div className="font-bold text-xs/none text-white">
                            www.youtube.com
                        </div>
                    </div>
                    <div className="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-600">
                        <div className="h-2 rounded bg-red-600" style={{width:"100%"}}></div>
                    </div>
                    <div className="h-fit w-full bg-neutral-20">
                        <div className="font-bold text-xs/none text-white">
                            13:32 / 20:00
                        </div>
                    </div>
                </div>
                {/* <div onClick={async () => await removeStorage("www.youtube.com")} className="h-1/3 rounded font-extrabold bg-yellow-50">
                        RESET
                    </div>
                   
                    <div onClick={async () => await clearStorage()} className="h-1/3 rounded font-extrabold bg-yellow-50">
                        CLEAR
                    </div> */}
            </div>
    );
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />);