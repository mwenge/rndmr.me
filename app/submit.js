
const url = "http://localhost:8080/video";

export async function getVideo(content) {
	let data = `{
			"date": "2022-05-25",
			"content": "` + content + `"
			}`;
	// await code here
	let result = await makeRequest("POST", url, data);
	console.log(result);
  let container;
  try {
    container = JSON.parse(result); 
  } catch(e) {
    console.log(e);
    return;
  }
  return container;
}

function makeRequest(method, url, data) {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(xhr.response);
			} else {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			}
		};
		xhr.onerror = function () {
			reject({
				status: this.status,
				statusText: xhr.statusText
			});
		};
		xhr.send(data);
	});
}
