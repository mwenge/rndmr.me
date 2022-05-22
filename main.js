import * as rec from "./app/record.js";

const mediaSelector = document.getElementById("media");

const camera = document.getElementById("camera");
const playback = document.getElementById("playback");

async function startRecording() {
  try {
    await rec.startRecording();
  } catch(e) {
    intertext.textContent = "ERR NO CAMRA";
  }
}
camera.onclick = ()=> {
  startRecording();
};
playback.onclick = ()=> {
  startRecording();
};
interstitial.onclick = ()=> {
  startRecording();
};

