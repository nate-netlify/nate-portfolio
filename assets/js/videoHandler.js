// videoHandler.js by maxtheaxe for nate-portfolio
// autoplays videos and pauses them when their parent modal is hidden

const observer = new MutationObserver((mutationList, observer) => {
    let modal = mutationList[0].target;
    let video = modal.querySelector('video');
    console.log("targetModal: ", modal);
    // if user opened modal for first time
    if (modal.style["display"] === "block") {
        video.dataset.user = 'play';
    } else if (modal.style["display"] === "none") {
        video.dataset.user = 'pause';
        video.dataset.auto = "";
    } // play or pause the video
    if (video.dataset.user === "play" && video.dataset.auto !== "done") {
        video.play();
        video.dataset.auto = "done";
    } else if (video.dataset.user === "play" && video.dataset.auto === "done") {
        return;
    } else {
        video.pause();
    }
});

var config = { attributes: true, childList: false, characterData: false };

// add observer to all the relevant portfolio items
let portfolioVideos = document.querySelectorAll('div.modal:has(video)');

for (const portfolioVideo of portfolioVideos) {
    observer.observe(portfolioVideo, config);
}