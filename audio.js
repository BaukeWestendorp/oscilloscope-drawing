function init() {
    const context = new (window.AudioContext || window.webkitAudioContext)();

    let buffer = context.createBuffer(2, soundWave.length, sampleRate);

    for (let i = 0; i < buffer.length; i++) {
        buffer.getChannelData(0)[i] = soundWave.left[i];
        buffer.getChannelData(1)[i] = soundWave.right[i];
    }

    let source = context.createBufferSource();

    source.buffer = buffer;
    source.connect(context.destination);
    source.loop = true;

    source.start();
}
