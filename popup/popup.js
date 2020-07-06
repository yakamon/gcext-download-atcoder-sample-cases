let downloadButton = document.getElementById("downloadButton");

function init() {
  /**
   * Request background page to download sample cases.
   */
  downloadButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const query = {
        method: "downloadSampleCases",
      };
      chrome.tabs.sendMessage(tabs[0].id, query, function (response) {
        console.log(response);
      });
    });
  });
}

init();
