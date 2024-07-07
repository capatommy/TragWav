let currentAudio = null;
let currentTrack = null;

function playTrack(track, location) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    currentAudio = new Audio('assets/' + track);
    currentTrack = location;
    
    currentAudio.play().then(() => {
        document.getElementById('currentTrack').textContent = `Playing: ${location}`;
        document.getElementById('playButton').disabled = true;
        document.getElementById('pauseButton').disabled = false;
    }).catch(error => {
        console.error("Error playing the audio file:", error);
    });

    currentAudio.onended = () => {
        document.getElementById('currentTrack').textContent = "No track playing";
        document.getElementById('playButton').disabled = true;
        document.getElementById('pauseButton').disabled = true;
    };
}

function pauseTrack() {
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        document.getElementById('playButton').disabled = false;
        document.getElementById('pauseButton').disabled = true;
    }
}

function resumeTrack() {
    if (currentAudio && currentAudio.paused) {
        currentAudio.play();
        document.getElementById('playButton').disabled = true;
        document.getElementById('pauseButton').disabled = false;
    }
}
