import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { set } from '@ember/object';

export default class MeetInputDivisionRoute extends Route {
  @service db;
  model({ division_id }) {
    var model = this.modelFor('meet');
    set(model, 'entries', this.db.getEntries(model.meet.id, division_id));
    set(model, 'results', this.db.getResultsByDivisionNum(model.meet.id, division_id));
    return hash(model);
  }
}
