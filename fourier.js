
let data = {
    left: [],
    right: [],
    length: 0
}

function setup() {
    createCanvas(400, 400);

    // Generate the input signal y coordinates
    let signalY = [];
    for (let i = 0; i < 1000; i++) {
        signalY[i] = i;
    }
    console.log("Created Signal!");

    // Generate the fourier transform data
    let fourierY = discreteFourierTransform(signalY);
    console.log("Created Fourier Transform");

    data.length = fourierY.length;
    for (let i = 0; i < signalY.length; i++) {
        let value = 0;

        for (let j = 0; j < data.length; j++) {
            let freq = fourierY[j].freq;
            let r = fourierY[j].amp;
            let phase = fourierY[j].phase;

            value += r * sin(freq * i + phase);
        }

        data.left.push(value);
    }

    // Normalize the output
    let lMax = 0;
    for (let v of data.left) {
        if (v > lMax) {
            lMax = v;
        }
    }
    for (let i = 0; i < data.left.length; i++) {
        data.left[i] /= lMax;
    }
    console.log("Created Data");

    // Draw it
    noFill();
    stroke(255, 0, 0);
    beginShape();
    let max = data.left.length;
    for (let i = 0; i < max; i++) {
        vertex(i, height / 2 + data.left[i] * 10);
    }
    endShape();
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