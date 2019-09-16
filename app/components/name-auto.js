import Component from '@ember/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NameAutoComponent extends Component {
  @service db;
  @tracked results;
  @tracked entries;
  @tracked division = 1;
  @tracked bibNumber;
  @tracked isResultsReversed = false;
  @tracked displayPlaceWarning = false;
  @tracked isActive = false;
  @tracked activeEntries = [];
  @tracked activeTitle = "Scanned Barcodes";

  get place() {
    return this.results.length + 1;
  }

  @action
  reverseOrder() {
    this.isResultsReversed = !this.isResultsReversed;
    this.results = this.results.reverse();
  }

  @action
  placeChanged() {
    this.displayPlaceWarning = this.results.length < this.place;
  }

  @action
  hideConfirmation() {
    this.isActive = false;
  }

  @action
  inputManually() {
    this.activeEntries = this.entries;
    this.activeTitle = "Manual Entry";
    this.isActive = true;
  }

  @action
  onDetection(barcodes) {
    if (barcodes.length > 0) {
      var entries = this.entries.filter((item) => {
        return barcodes.mapBy('rawValue').includes(item.id.toString());
      });
      entries = entries.filter((item) => {
        return !this.results.mapBy('entry.id').includes(item.id);
      });
      if (entries.length) {
        this.activeEntries = entries;
        this.activeTitle = "Scanned Barcodes";
        this.isActive = true;
      }
    }
  }

  @action
  async onConfirm() {
    let resultId = await this.db.addResult({
      place: this.place,
      time: '',
      entry: this.activeEntry
    });
    this.activeEntry.resultId = resultId;
    this.db.updateEntry(this.activeEntry);
    if (this.isResultsReversed) {
      this.results.unshift({ place: this.place, entry: this.activeEntry });
    } else {
      this.results.push({ place: this.place, entry: this.activeEntry });
    }
    this.entries.splice(this.place, 1);
    this.entries = this.entries;
    this.results = this.results;
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
