const mediaSelector = document.getElementById("media");

const webCamContainer =
	document.getElementById("web-cam-container");

let selectedMedia = null;

// Handler function to handle the "change" event
// when the user selects some option
mediaSelector.addEventListener("change", (e) => {

	// Takes the current value of the mediaSeletor
	selectedMedia = e.target.value;

	document.getElementById(
		`${selectedMedia}-recorder`)
			.style.display = "block";

	document.getElementById(
			`${otherRecorderContainer(
			selectedMedia)}-recorder`)
		.style.display = "none";
});

function otherRecorderContainer(selectedMedia) {
	return selectedMedia === "vid" ?  "aud" : "vid";
}


