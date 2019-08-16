import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MeetInputPlaceController extends Controller {
    @tracked barcodes = [];
    @action
    onDetection(barcodes) {
        console.log({barcodes});
        for (let i = 0; i < barcodes.length; i++) {
            barcodes[i].entry = this.model.entries[barcodes[i].rawValue];
        }
        this.barcodes = barcodes;
    }
}
