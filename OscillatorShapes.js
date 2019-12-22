class OscillatorShapes {
    /**
     * @param {number} sampleRate The samplerate of the buffer.
     */
    constructor(sampleRate) {
        this.sampleRate = sampleRate;
        this.context = new (
            window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext ||
            window.msAudioContext
        );
    }

    reconnectNodes(buffer) {
        if (this.gainNode != null) this.gainNode.disconnect();
        if (this.source != null) {
            this.source.disconnect();
            this.source.stop();
        }

        this.gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode();
        this.gainNode.connect(this.context.destination);

        this.source = this.context.createBufferSource ? this.context.createBufferSource() : this.context.createBufferSourceNode();
        this.source.buffer = buffer;
        this.source.loop = true;
        this.source.connect(this.gainNode);
        this.source.start();
    }

    /**
     * Plays the right sound to generate the given shape.
     * @param {*} shape The shape to display/make the sound for.
     */
    playSound(shape) {
        if (shape.length < 2) {
            console.error("The shape must at least have two points!");
            return;
        }

        let buffer = this.context.createBuffer(2, shape.length, this.sampleRate);

        for (let i = 0; i < shape.length; i++) {
            buffer.getChannelData(0)[i] = shape[i].x;
            buffer.getChannelData(1)[i] = shape[i].y;
        }

        this.reconnectNodes(buffer);

        this.gainNode.gain.value = 1;

        console.log(buffer.getChannelData(0).length);
    }

    /**
     * Sets the volume of the sound to 0.
     */
    stopSound() {
        if (this.gainNode != null) {
            this.gainNode.gain.value = 0;
        }
    }

    /**
     * @param {number} volume Changes the volume of the sound.
     */
    setVolume(volume) {
        this.gainNode.gain.value = volume;
    }
}