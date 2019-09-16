import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';


export default class TimeAutoComponent extends Component {
  @service db;
  @tracked place = 1;
  @tracked isActive = false;
  @tracked isResultsReversed = false;
  @tracked activeTimes = [];

  @action
  onDetection(data) {
    var result;
    for (let i = 0; i < data.length; i++) {
      result = this.getTimeFromText(data[i].rawValue);
      this.activeTimes.push(...result);
    }
    this.activeTimes = this.activeTimes
    this.isActive = true;
    console.log({ data });
  }

  getTimeFromText(segment) {
    const regex = /(\d+)-(\d|O)?:? ?((?:\d|O)+)'? ?((?:\d|O)+) ?,?((?:\d|O)+)/gm;
    let m;
    let result = [];
    while ((m = regex.exec(segment)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      result.push({
        raw: m[0],
        place: m[1],
        hours: m[2] || "0",
        minutes: m[3] || "00",
        seconds: m[4] || "00",
        milliseconds: m[5] || "00"
      });
    }
    return result;
  }

  @action
  reverseOrder() {
    this.isResultsReversed = !this.isResultsReversed;
    this.results = this.results.reverse();
  }

  @action
  hideConfirmation() {
    this.isActive = false;
  }

  @action
  async submit() {
    var result;
    if (this.results.length >= this.place) {
      //update result with time
      result = this.results.find(item => item.place == this.place);
      set(result, "time", this.time);
      await this.db.updateResult(result);
    } else {
      this.displayPlaceWarning = true;
    }
    this.resetInputs();
    this.results = this.results;
    this.place++;
  }
}