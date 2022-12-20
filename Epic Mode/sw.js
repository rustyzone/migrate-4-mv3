async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",

    /* valid reasons: 
    AUDIO_PLAYBACK, 
    BLOBS, 
    CLIPBOARD, 
    DISPLAY_MEDIA, 
    DOM_PARSER, 
    DOM_SCRAPING, 
    IFRAME_SCRIPTING,
    TESTING, 
    USER_MEDIA, 
    WEB_RTC.
    */
    reasons: ["AUDIO_PLAYBACK"],
    justification: "testing",
  });
}

//Listen for messages
chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  await createOffscreen();
  if (msg.name == "sw-playTrack") {
    console.log("sw-playTrack", msg);
    chrome.runtime.sendMessage({ name: "playTrack", track: msg.track });
  }

  if (msg.name == "sw-pauseTrack") {
    chrome.runtime.sendMessage({ name: "pauseTrack" });
  }
});
