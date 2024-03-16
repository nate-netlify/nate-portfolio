// videoHandler.js by maxtheaxe for nate-portfolio
// autoplays videos and pauses them when their parent modal is hidden

const observer = new MutationObserver((mutationList, observer) => {
    let modal = mutationList[0].target;
    let vDiv = modal.querySelector("div.vimeo");
    let iframe = modal.querySelector("iframe");
    iframe.click(); // trick chrome into thinking user interacted with it
    let vPlayer = new Vimeo.Player(modal.querySelector("iframe"));
    // if user opened modal for first time
    if (modal.style["display"] === "block") {
        console.log("first open");
        vDiv.dataset.user = "play";
    } else if (modal.style["display"] === "none") {
        console.log("closed");
        vDiv.dataset.user = "pause";
        vDiv.dataset.auto = "";
    } // play or pause the video
    if (vDiv.dataset.user === "play" && vDiv.dataset.auto !== "done") {
        console.log("resuming");
        vPlayer.play();
        vDiv.dataset.auto = "done";
    } else if (vDiv.dataset.user === "play" && vDiv.dataset.auto === "done") {
        return;
    } else {
        console.log("paused");
        vPlayer.pause();
    }
});

var config = { attributes: true, childList: false, characterData: false };

// add observer to all the relevant portfolio items
let portfolioVideos = document.querySelectorAll('div.modal:has(iframe)');

for (const portfolioVideo of portfolioVideos) {
    observer.observe(portfolioVideo, config);
}