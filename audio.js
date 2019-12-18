// let data;

// function setup() {
//     // data = loadJSON('data/squarewave.json');
// }

function init() {
    const context = new (window.AudioContext || window.webkitAudioContext)();

    let buffer = context.createBuffer(2, data.length, 3000);

    for (let i = 0; i < buffer.length; i++) {
        buffer.getChannelData(0)[i] = data.left[i];
        buffer.getChannelData(1)[i] = data.right[i];
    }

    let source = context.createBufferSource();

    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
}