document.querySelector("button.play").addEventListener("click", function () {
  const SelTrack = document.querySelector("select").value;

  chrome.runtime.sendMessage({ name: "sw-playTrack", track: SelTrack });
});

document.querySelector("button.pause").addEventListener("click", function () {
  chrome.runtime.sendMessage({ name: "sw-pauseTrack" });
});
