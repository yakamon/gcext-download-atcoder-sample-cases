function getSampleCases() {
  const samples = Array.from(
    document.querySelectorAll(".lang-ja pre[id^=pre-sample]")
  );

  cases = [];
  for (let i = 0; i < samples.length; i += 2) {
    cases.push({
      input: samples[i].innerText,
      output: samples[i + 1].innerText,
    });
  }
  return cases;
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = filename;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadSampleCases() {
  let samples = getSampleCases();
  samples.forEach(function (e, i) {
    downloadFile(String.fromCharCode(i + 97), e["input"]);
    // downloadFile(String.fromCharCode(i + 97), e["output"]);
  });
}

function init() {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.method === "downloadSampleCases") {
      downloadSampleCases();
      sendResponse({});
    }
    return true;
  });
}

init();
