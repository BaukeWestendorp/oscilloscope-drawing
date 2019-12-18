let time = 0;
let wave = [];

let waveOffset = 100;
let radius = 50;

function setup() {
    createCanvas(600, 400);
}

function draw() {
    let x = 0;
    let y = 0;

    // Set the background color.
    background(0);
    // Translate the coordinate system.
    translate(100, 200);

    for (let i = 0; i < 150; i++) {
        let prevX = x;
        let prevY = y;

        let n = i * 2 + 1;

        // Calculate the radius of the circle.
        let r = radius * (4 / (n * PI));

        // Calculate the coordinates around the circle.
        x += r * cos(n * time);
        y += r * sin(n * time);

        // Display a circle.
        stroke(255, 80);
        noFill();
        ellipse(prevX, prevY, r * 2);
        // Add a line between the circles.
        stroke(255, 80);
        line(prevX, prevY, x, y);
        // Display the dot on the circle.
        // fill(255);
        // ellipse(x, y, 4);
    }

    fill(255, 0, 0);
    ellipse(10, y, 8, 8);

    // Add the y value to the end of the wave array.
    wave.unshift(y);
    // Remove points that are of the screen.
    if (wave.length > width - waveOffset) {
        wave.pop();
    }

    // Show the wave.
    beginShape();
    noFill();
    stroke(255);
    for (let i = 0; i < wave.length; i++) {
        vertex(i + waveOffset, wave[i]);
    }
    endShape();

    // Add a line between the rotating point and the wave end.
    stroke(255, 80);
    line(x, y, waveOffset, y);

    time -= 0.01;
}