import * as sub from "./submit.js";
// This array stores the recorded media data
let chunks = [];
const duration = 5;

const videoMediaConstraints = {
  facingMode: 'environment',
  audio: true,
  video: true,
};

let camera = document.getElementById("camera");
let playback = document.getElementById("playback");
let strap = document.getElementById("strap");

let playbackTime;
playback.ontimeupdate = (e) => {
  let pt = playbackTime.add(parseInt(playback.currentTime, 10), 's');
  strap.textContent = pt.format('YYYY-MM-DD HH:MM:ss');
};

// When the user clicks the "Start // Recording" button this function // gets invoked
export async function startRecording() {

  playback.style.display = "none";
  camera.style.display = "block";
  // Access the camera and microphone
  let mediaStream = await navigator.mediaDevices.getUserMedia(videoMediaConstraints);
  // Create a new MediaRecorder instance
  const mediaRecorder = new MediaRecorder(mediaStream);

  let startTime = dayjs().format('YYYY-MM-DD HH:MM:ss');
  strap.textContent = "🔴 " + startTime;
  chunks = [startTime];
  mediaRecorder.start(1000);

  mediaRecorder.ondataavailable = (e) => {
    strap.textContent = "🔴 " + dayjs().format('YYYY-MM-DD HH:MM:ss');

    chunks.push(e.data);
    if (chunks.length == duration) {
      mediaRecorder.stop();
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  mediaRecorder.onstop = submitVideo;
  camera.srcObject = mediaStream;
}

async function submitVideo() {
  strap.textContent = '';

  const blob = new Blob(
    chunks, {
      type: "video/mp4"
    });
  chunks = [];

  // Get the video data returned.
  let ds = await sub.getVideo(blob);

  // Extract the date from the video data.
  let dt = await ds.slice(0,19).text();
  playbackTime = dayjs(dt, "YYYY-MM-DD HH:MM:ss");
  strap.textContent = playbackTime.format('YYYY-MM-DD HH:MM:ss');

  // Video data starts at this position.
  let video = ds.slice(19)

  // You can not directly set the blob as
  // the source of the video or audio element
  // Instead, you need to create a URL for blob
  // using URL.createObjectURL() method.
  const recordedMediaURL = URL.createObjectURL(video);

  // Now you can use the created URL as the
  // source of the video or audio element
  playback.style.display = "block";
  camera.style.display = "none";
  playback.src = recordedMediaURL;
  try {
    playback.play();
  } catch(e) {
    console.log("Error playing: ", e);
  }
}
