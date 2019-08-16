import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PlaceManualComponent extends Component {
  @service db;
  @tracked division = 1;
  @tracked bibNumber;
  @tracked isResultsReversed = false;
  @tracked results = [];
  @tracked entries = [];

  get place() {
    return this.results.length + 1;
  }

  @action
  reverseOrder() {
    this.isResultsReversed = !this.isResultsReversed;
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
    this.results.push({ place: this.place, entry });
    this.entries.splice(index, 1);
    this.results = this.results;
    this.entries = this.entries;
  }
}
