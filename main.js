import * as rec from "./app/record.js";

const mediaSelector = document.getElementById("media");

const camera = document.getElementById("camera");
const playback = document.getElementById("playback");

camera.onclick = ()=> {
  rec.startRecording();
};
playback.onclick = ()=> {
  rec.startRecording();
};

