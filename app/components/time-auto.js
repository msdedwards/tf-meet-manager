import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';


export default class TimeAutoComponent extends Component {
  @service db;
  @tracked place = 1;
  @tracked isActive = false;
  @tracked isManualActive = false;
  @tracked isResultsReversed = false;
  @tracked activeTimes = [];

  @action
  onDetection(data) {
    var result;
    this.activeTimes = [];
    for (let i = 0; i < data.length; i++) {
      result = this.processTimeFromText(data[i].rawValue);
      this.activeTimes.push(...result);
    }
    this.activeTimes = this.activeTimes;
    this.isActive = true;
  }

  @action
  editTime(time) {
    set(time, "isEditing", true);
  }

  @action
  saveTime(time, index) {
    this.activeTimes[index] = this.processTimeFromText(time.formatted)[0];
    this.activeTimes = this.activeTimes;
    //set(time, "isEditing", false);
  }

  processTimeFromText(segment) {
    const strictTest = /^\d+-\d:\d{2}(?:'|’)\d{2} \d{2}$/;
    const regex = /(\d+)-(\d)?:? ?((?:\d){2})'? ?’?((?:\d){2}) ?,?((?:\d){2})/gm;
    let result = [];
    let hasResultForTime, formatted, isValid, m, time;
    // let raw, place, hours, minutes, seconds, hundredths;
    segment = segment.replace(/O/gm, "0");
    while ((m = regex.exec(segment)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      hasResultForTime = Number(m[1]) <= this.results.length;
      time = `${m[2] || "0"}:${m[3] || "00"}'${m[4] || "00"} ${m[5] || "00"}`;
      formatted = `${m[1]}-${time}`;
      isValid = strictTest.test(formatted) && hasResultForTime
      result.push({
        raw: m[0],
        place: m[1],
        time,
        formatted,
        isValid,
        hasResultForTime,
        isEditing: false,
        isSelected: isValid
      });
    }
    return result;
  }

  @action
  inputManually() {
    this.isManualActive = true;
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
  hideManualConfirmation() {
    this.isManualActive = false;
  }

  @action
  async saveTimes() {
    var result;
    let active;
    this.isActive = false;
    for (let i = 0; i < this.activeTimes.length; i++) {
      active = this.activeTimes[i];
      result = this.results.find(item => item.place == active.place);
      if (result) {
        set(result, "time", active.time);

        //update result with time
        await this.db.updateResult(result);
      }
    }
    this.results = this.results;
  }
}