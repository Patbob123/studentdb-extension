import { getStorage, removeStorage, clearStorage, getCurrentTab, setSettings } from "../modules/storage.js";
import * as time from '../modules/time.js';
function App() {
  let [hostArr, setHostArr] = React.useState([]);
  let storage;
  React.useEffect(() => {
    let getData = async () => {
      storage = await getStorage();
      let hostNameArr = [];
      for (let i in storage.settings.trackedHosts) {
        let curHost = storage.settings.trackedHosts[i];
        if (storage[curHost]) {
          let cooldown = storage[curHost].timeSpent < 0;
          let date = new Date(null);
          date.setSeconds(Math.abs(storage[curHost].timeSpent));
          let timeSpentDisplay = date.toISOString().substr(11, 8);
          date = new Date(null);
          date.setSeconds(storage.settings.maxTime);
          let maxTimeDisplay = date.toISOString().substr(11, 8);
          let barPercentDisplay = Math.abs(storage[curHost].timeSpent) / storage.settings.maxTime > 1 ? 1 : Math.abs(storage[curHost].timeSpent) / storage.settings.maxTime * 100 + "%";
          hostNameArr.push({
            hostname: curHost,
            timeSpent: timeSpentDisplay,
            maxTime: maxTimeDisplay,
            barPercent: barPercentDisplay,
            onCooldown: cooldown
          });
        }
      }
      setHostArr(hostNameArr);
      await new Promise(resolve => setTimeout(resolve, 100));
      getData();
    };
    getData();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full bg-slate-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex w-full px-5 py-4 space-x-4 "
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-none items-center w-16 h-16"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/icon128.png",
    alt: "Icon",
    className: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-1 w-auto h-16 items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-extrabold tracking-widest text-3xl text-transparent text-center flex"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#00c3b1"
    }
  }, "UN"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#ff6b65"
    }
  }, "TANGLE")))), hostArr.map((host, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex flex-col px-16 my-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-16 bg-neutral-20 font-bold text-white text-5xl"
  }, host.hostname), /*#__PURE__*/React.createElement("div", {
    className: "rounded bg-neutral-200 dark:bg-neutral-600"
  }, /*#__PURE__*/React.createElement("div", {
    className: (host.onCooldown ? "bg-red-600" : "bg-green-500") + " h-2 rounded",
    style: {
      width: host.barPercent
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-neutral-20 font-bold text-white text-3xl"
  }, host.timeSpent, " / ", host.maxTime))));
}
ReactDOM.createRoot(document.querySelector('#root')).render( /*#__PURE__*/React.createElement(App, null));