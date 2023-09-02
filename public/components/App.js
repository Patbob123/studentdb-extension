import { getStorage, removeStorage, clearStorage } from "../modules/storage.js";
import * as time from '../modules/time.js';
function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-80 h-80 bg-slate-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex w-full h-1/3 px-5 py-4 space-x-4 "
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-none items-center w-16 h-16"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/icon128.png",
    alt: "Icon",
    className: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-1 w-auto h-16 items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-extrabold text-3xl text-transparent text-center bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600 duration-700"
  }, "UNTANGLED"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-full h-1/3 px-5 space-y-1 justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-fit w-full bg-neutral-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-xs/none text-white"
  }, "www.youtube.com")), /*#__PURE__*/React.createElement("div", {
    className: "h-2 w-full rounded bg-neutral-200 dark:bg-neutral-600"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-2 rounded bg-red-600",
    style: {
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "h-fit w-full bg-neutral-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-xs/none text-white"
  }, "13:32 / 20:00"))));
}
ReactDOM.createRoot(document.querySelector('#root')).render( /*#__PURE__*/React.createElement(App, null));