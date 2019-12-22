let oscShapes = new OscillatorShapes(44100);

let shape = [];

function play() {
    oscShapes.playSound(shape);
}

function stop() {
    oscShapes.stopSound();
}

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerWidth / 5 * 4);
    canvas.parent('drawable');
}

function draw() {
    background(8);

    if (mouseIsPressed && mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
        shape.push({ x: mouseX / width, y: mouseY / height });
    }

    stroke(0, 255, 0, 128);
    strokeWeight(1);
    for (let i = 1; i < shape.length; i++) {
        line(shape[i].x * width, shape[i].y * height,
            shape[i - 1].x * width, shape[i - 1].y * height);
    }
}