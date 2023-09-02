import { getStorage, removeStorage } from "../modules/storage.js";
import * as time from '../modules/time.js'

function App() {
    let [visitCount, setVisitCount] = React.useState(0);

    React.useEffect(() => {
        let abc = async () => {
            let x = await getStorage("www.youtube.com")
            let y = x["www.youtube.com"]
            console.log(y)
            setVisitCount(y)
        }
        abc()

    },[])
    return (
        <div style={{height:'20rem',width:'20rem'}}>
        <div>
            {visitCount?.start} {visitCount?.current} {time.compareTime(visitCount.current, visitCount.start)}
        </div>
            <div onClick={async () => await removeStorage("www.youtube.com")} style={{ backgroundColor: 'red', textAlign: 'center' }}>
                RESET
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />);