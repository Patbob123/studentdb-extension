import { createApp } from "vue";
import Popup from "./App";
import "@/styles/main.css";

const MOUNT_EL_ID = "something-i-need-later";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
  mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);

const vm = createApp(Popup).mount(mountEl);

chrome.runtime.onMessage.addListener(message => {
  if (message.toggleVisible) {
    vm.visible = !vm.visible;
  }
});