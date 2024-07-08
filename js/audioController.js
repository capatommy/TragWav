let currentAudio = null;
let currentTrackName = '';
let isPlaying = false;

function playTrack(track, name) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(`assets/${track}`);
    currentTrackName = name;
    currentAudio.play();

    document.getElementById('currentTrack').innerText = `Playing: ${name}`;
    document.getElementById('playButton').disabled = true;
    document.getElementById('pauseButton').disabled = false;

    currentAudio.addEventListener('timeupdate', updateProgress);
    currentAudio.addEventListener('ended', () => {
        document.getElementById('currentTrack').innerText = `No track playing`;
        document.getElementById('playButton').disabled = true;
        document.getElementById('pauseButton').disabled = true;
        document.getElementById('progress').style.width = '0%';
        document.getElementById('timeDisplay').innerText = '0:00 / 0:00';
    });

    isPlaying = true;
}

function pauseTrack() {
    if (currentAudio && isPlaying) {
        currentAudio.pause();
        document.getElementById('playButton').disabled = false;
        document.getElementById('pauseButton').disabled = true;
        isPlaying = false;
    }
}

function resumeTrack() {
    if (currentAudio && !isPlaying) {
        currentAudio.play();
        document.getElementById('playButton').disabled = true;
        document.getElementById('pauseButton').disabled = false;
        isPlaying = true;
    }
}

function updateProgress() {
    if (currentAudio) {
        const progress = document.getElementById('progress');
        const timeDisplay = document.getElementById('timeDisplay');
        const duration = currentAudio.duration;
        const currentTime = currentAudio.currentTime;
        const progressPercent = (currentTime / duration) * 100;

        progress.style.width = `${progressPercent}%`;
        timeDisplay.innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60);
    return `${minutes}:${secondsPart < 10 ? '0' : ''}${secondsPart}`;
}
