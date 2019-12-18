let time = 0;
let wave = [];

let signalY = [];
let fourierY;

const waveOffset = 100;

function setup() {
    createCanvas(600, 400);

    for (let i = 0; i < 100; i++) {
        signalY[i] = i;
    }

    fourierY = discreteFourierTransform(signalY);
}

function draw() {
    let x = 0;
    let y = 0;

    // Set the background color.
    background(0);
    // Translate the coordinate system.
    translate(100, 200);

    for (let i = 0; i < fourierY.length; i++) {
        let prevX = x;
        let prevY = y;

        let freq = fourierY[i].freq;
        let r = fourierY[i].amp;
        let phase = fourierY[i].phase;

        // Calculate the coordinates around the circle.
        x += r * cos(freq * time + phase + HALF_PI);
        y += r * sin(freq * time + phase + HALF_PI);


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

    const dt = TWO_PI / fourierY.length;
    time -= dt;
}

function discreteFourierTransform(x) {
    let X = [];
    const N = x.length;

    for (let k = 0; k < N; k++) {
        let re = 0;
        let im = 0;

        for (let n = 0; n < N; n++) {
            let phi = (TWO_PI * k * n) / N

            re += x[n] * cos(phi);
            im -= x[n] * sin(phi);
        }

        re /= N;
        im /= N;

        let freq = k;
        let amp = sqrt(re * re + im * im);
        let phase = atan2(im, re);

        X[k] = { re, im, freq, amp, phase };
    }

    return X;
}