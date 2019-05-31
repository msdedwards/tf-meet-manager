import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class MeetInputManualController extends Controller {
    @tracked place = 1;
    @tracked hours = 0;
    @tracked minutes = "00";
    @tracked seconds = "00.00";
    @tracked isResultsReversed = false;
    @tracked results = [];
    @tracked hideHours = true;

    @action
    reverseOrder() {
        this.isResultsReversed = !this.isResultsReversed;
    }

    get time() {
        return this.hours + ':' + this.minutes + ':' + Number(this.seconds).toFixed(2);
    }

    resetInputs() {
        this.hours = 0;
        this.minutes = "00";
        this.seconds = "00.00";
    }

    @action
    submit() {
        this.results.push({
            place: this.place,
            time: this.time
        });
        this.resetInputs();
        this.results = this.results;
        this.place++;
    }
}
