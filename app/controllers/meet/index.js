import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MeetIndexController extends Controller {
    @tracked displayPrintPreview;
    @action
    togglePrintPreview() {
        this.displayPrintPreview = !this.displayPrintPreview;
    }
}
