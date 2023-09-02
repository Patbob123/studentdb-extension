import { getStorage, removeStorage } from "../modules/storage.js";
import * as time from '../modules/time.js';
function App() {
  let [visitCount, setVisitCount] = React.useState(0);
  React.useEffect(() => {
    let abc = async () => {
      let x = await getStorage("www.youtube.com");
      let y = x["www.youtube.com"];
      console.log(y);
      setVisitCount(y);
    };
    abc();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '20rem',
      width: '20rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, visitCount?.start, " ", visitCount?.current, " ", time.compareTime(visitCount.current - visitCount.start)), /*#__PURE__*/React.createElement("div", {
    onClick: async () => await removeStorage("www.youtube.com"),
    style: {
      backgroundColor: 'red',
      textAlign: 'center'
    }
  }, "RESET"));
}
ReactDOM.createRoot(document.querySelector('#root')).render( /*#__PURE__*/React.createElement(App, null));