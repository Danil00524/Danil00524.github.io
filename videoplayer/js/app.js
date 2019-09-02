const player = new VideoPlayer({
    videoUrl: './video/banana.mp4',
    videoContainer: 'body',
    volume: 0.5,
    skipBack: -1,
    skipNext: 1,
});

player.init();

console.log(player);
