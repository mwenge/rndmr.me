// This array stores the recorded media data
let chunks = [];

const audioMediaConstraints = {
	audio: true,
	video: false,
};

const videoMediaConstraints = {
	audio: true,
	video: true,
};

// When the user clicks the "Start // Recording" button this function // gets invoked
async function startRecording() {

  let selectedMedia = "vid";
	// Access the camera and microphone
	let mediaStream = await navigator.mediaDevices.getUserMedia(videoMediaConstraints);

  // Create a new MediaRecorder instance
  const mediaRecorder = new MediaRecorder(mediaStream);

  mediaRecorder.start();

  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = () => {

    const blob = new Blob(
      chunks, {
        type: selectedMedia === "vid" ?  "video/mp4" : "audio/mpeg"
      });
    chunks = [];

    // Create a video or audio element
    // that stores the recorded media
    const recordedMedia = document.createElement(selectedMedia === "vid" ? "video" : "audio");
    recordedMedia.controls = true;

    // You can not directly set the blob as
    // the source of the video or audio element
    // Instead, you need to create a URL for blob
    // using URL.createObjectURL() method.
    const recordedMediaURL = URL.createObjectURL(blob);

    // Now you can use the created URL as the
    // source of the video or audio element
    recordedMedia.src = recordedMediaURL;


    //URL.revokeObjectURL(recordedMedia);
  }

  if (selectedMedia === "vid") {
    // Remember to use the srcObject
    // attribute since the src attribute
    // doesn't support media stream as a value
    webCamContainer.srcObject = mediaStream;
  }

}

function stopRecording(thisButton, otherButton) {

	// Stop the recording
	window.mediaRecorder.stop();

	// Stop all the tracks in the
	// received media stream
	window.mediaStream.getTracks().forEach((track) => {
		track.stop();
	});

	document.getElementById( `${selectedMedia}-record-status`) .innerText = "Recording done!";
	thisButton.disabled = true;
	otherButton.disabled = false;
}
