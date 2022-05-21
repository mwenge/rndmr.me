
const url = "https://" + location.hostname + ":8080/video";

export async function getVideo(blob) {
  let result = await makeRequest("POST", url, blob);
  return result;
}

function makeRequest(method, url, data) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "blob"
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
