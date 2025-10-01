const videos = [
  'Construction-video/video1.mp4',
  'Construction-video/video2.mp4',
  'Construction-video/video3.mp4',
  'Construction-video/video4.mp4',
  'Construction-video/video5.mp4'
];

const speeds = [1.5, 1.2, 1.5, 1, 0.8]; // playback speed per video

let currentIndex = 0;
let nextIndex = 1;

const videoA = document.getElementById('video1');
const videoB = document.getElementById('video2');

// Initialize first video
videoA.src = videos[currentIndex];
videoA.playbackRate = speeds[currentIndex];
videoA.style.opacity = 1;
videoA.play();

// Preload next video
videoB.src = videos[nextIndex];
videoB.playbackRate = speeds[nextIndex];
videoB.play();

function crossfade() {
  // fade current out, next in
  videoA.style.opacity = 0;
  videoB.style.opacity = 1;

  setTimeout(() => {
    // Swap video roles
    const temp = videoA.src;
    videoA.src = videoB.src;
    videoB.src = temp;

    const tempSpeed = videoA.playbackRate;
    videoA.playbackRate = videoB.playbackRate;
    videoB.playbackRate = tempSpeed;

    currentIndex = (currentIndex + 1) % videos.length;
    nextIndex = (currentIndex + 1) % videos.length;

    videoB.src = videos[nextIndex];
    videoB.playbackRate = speeds[nextIndex];
    videoB.load();
    videoB.play();
  }, 1000); // fade duration
}

// Automatically crossfade when video ends
videoA.addEventListener('ended', crossfade);
videoB.addEventListener('ended', crossfade);
