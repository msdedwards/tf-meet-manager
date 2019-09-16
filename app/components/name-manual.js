import Component from '@ember/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NameManualComponent extends Component {
  @service db;
  @tracked results;
  @tracked entries;
  @tracked division = 1;
  @tracked bibNumber;
  @tracked isResultsReversed = false;
  @tracked displayEntries = true;

  get place() {
    return this.results.length + 1;
  }

  @action
  hideDetails() {
    this.isActive = false;
  }

  @action
  reverseOrder() {
    this.isResultsReversed = !this.isResultsReversed;
    this.results = this.results.reverse();
  }

  @action
  finishPlaceInput() {

  }

  @action
  async submit(entry, index) {
    let resultId = await this.db.addResult({
      place: this.place,
      time: '',
      entry: entry
    });
    entry.resultId = resultId;
    this.db.updateEntry(entry);
    if (this.isResultsReversed) {
      this.results.unshift({ place: this.place, entry });
    } else {
      this.results.push({ place: this.place, entry });
    }
    this.entries.splice(index, 1);
    this.results = this.results;
    this.entries = this.entries;
  }

  @action
  async swapUp(result, index) {
    var aboveIndex = index - 1;
    if (index === 0) {
      aboveIndex = this.results.length - 1;
    }
    var aboveResult = this.results[aboveIndex];
    var temp = result.entry;
    set(result, 'entry', aboveResult.entry);
    set(aboveResult, 'entry', temp);
    this.db.updateResult(result);
    this.db.updateResult(aboveResult);
  }
}
