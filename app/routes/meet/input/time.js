import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class MeetInputTimeRoute extends Route {
    @action
    onDetection(barcodes) {
        console.log({barcodes});
    }
}
