let soundWave;

const sampleRate = 44100;
const frequency = 220;

function setup() {
    noCanvas();

    let fourierDetail = (1/frequency) * sampleRate;

    let signal = [];
    for (let i = 0; i < fourierDetail; i++) {
        signal.push(sin(i));
    }

    soundWave = generateSoundData(signal);
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
            // Get the data from the current sample.
            let freq = fourier[i].freq;
            let r = fourier[i].amp;
            let phase = fourier[i].phase;

            // Calculate the coordinates around the circle.
            y += r * sin(freq * time + phase + HALF_PI);
        }

        // Normalize the output.
        let max = Math.max(...currentChannel);
        let min = Math.min(...currentChannel);
        currentChannel = currentChannel.map(v => map(v, min, max, 0, 1));

        currentChannel.push(y);

        // Increase time.
        const dt = TWO_PI / fourier.length;
        time -= dt;
    }

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
