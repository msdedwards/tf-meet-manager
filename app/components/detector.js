/* global BarcodeDetector, TextDetector */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DetectorComponent extends Component {
    @tracked stream;
    @tracked frame;
    @tracked isStreaming = false;
    @tracked detected = [];

    async initializeStream() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: "environment",
                    width: {
                        min: 480,
                        max: 1280,
                        ideal: 1280
                    },
                    height: {
                        min: 320,
                        max: 720,
                        ideal: 720
                    }
                }
            });
            this.isStreaming = true;
        } catch (err) {
            this.isStreaming = false;
            alert('Failed to initialize camera');
        }
    }

    @action
    init(detectionType = "barcode") {
        let type = this.args.type || detectionType;
        if (!navigator.mediaDevices.getUserMedia) {
            alert('No camera!');
            return;
        }

        if (type === "text" && typeof window.TextDetector === "undefined") {
            alert('No text detection!');
            return;
        }

        if (type === "barcode" && typeof window.BarcodeDetector === "undefined") {
            alert('No barcode detection!');
            return;
        }

        this.detectionType = type;
        this.initializeStream();
    }

    @action
    scan() {
        var detector;
        if (this.detectionType === "barcode") {
            detector = new BarcodeDetector({ formats: ['code_128'] });
        } else if (this.detectionType === "text") {
            detector = new TextDetector();
        } else {
            throw new Error("Unknown detector type");
        }
        let capturer = new ImageCapture(this.stream.getVideoTracks()[0]);
        capturer.grabFrame().then(frame => {
            detector.detect(frame)
                .then(this.args.onDetection)
                .catch((err) => {
                    alert(`Failed ${this.detectionType} detection`);
                    throw err;
                });
        })
    }

    @action
    close() {
        this.isStreaming = false;
    }
}
