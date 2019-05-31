import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MeetIndexController extends Controller {
    @tracked displayPrintPreview;
    @tracked activeEntry;
    @tracked isActive = false;
    @action
    togglePrintPreview() {
        this.displayPrintPreview = !this.displayPrintPreview;
    }

    @action
    showDetails(entry) {
        this.isActive = true;
        this.activeEntry = entry;
    }

    @action
    hideDetails() {
        this.isActive = false;
        this.activeEntry = null;
    }
}
