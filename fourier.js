let osc = new Oscillator(5);
let data;

function setup() {
    createCanvas(600, 400);

    let sampleRate = 3000;
    let frequency = 220;
    let fourierDetail = sampleRate/frequency;

    let signal = [];
    for (let n = 0; n < sampleRate/fourierDetail; n++) {
        for (let i = 0; i < fourierDetail; i++) {
            signal.push(sin(i));
        }
    }

    data = generateSoundData(signal);
}

function draw() {

    let oscData = [];
    for (let i = 0; i < data.length; i++) {
        oscData.push([i, data.left[i]]);
    }

    osc.display(oscData);

    console.log(oscData);

    noLoop();
}

function generateSoundData(signal) {
    let time = 0;

    let fourier = discreteFourierTransform(signal);

    let data = {
        left: [],
        right: [],
        length: signal.length
    }

    let currentChannel = []

    for (let n = 0; n < fourier.length; n++) {
        let y = 0;

        for (let i = 0; i < fourier.length; i++) {
            let freq = fourier[i].freq;
            let r = fourier[i].amp;
            let phase = fourier[i].phase;

            // Calculate the coordinates around the circle.
            y += r * sin(freq * time + phase + HALF_PI);
        }

        const dt = TWO_PI / fourier.length;
        time -= dt;

        currentChannel.push(y);
    }

    let max = Math.max(...currentChannel);
    let min = Math.min(...currentChannel);
    currentChannel = currentChannel.map(v => map(v, min, max, 0, 1));

    data.left = currentChannel;

    return data;
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
