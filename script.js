function playTrack(track) {
    var audio = new Audio('assets/' + track);
    audio.play().catch(error => {
        console.error("Error playing the audio file:", error);
    });
}
