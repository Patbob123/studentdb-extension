import { getStorage, removeStorage } from "../modules/storage.js";
import * as time from '../modules/time.js';
function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-80 h-80 bg-slate-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex w-full h-1/3 space-x-4 px-5 py-4"
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
    className: "flex w-full h-1/3 px-5 py-4 justify-center bg-red-600"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: async () => await removeStorage("www.youtube.com"),
    className: "h-1/3 rounded font-extrabold bg-yellow-50"
  }, "RESET")));
}
ReactDOM.createRoot(document.querySelector('#root')).render( /*#__PURE__*/React.createElement(App, null));