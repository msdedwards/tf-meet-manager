import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MeetRoute extends Route {
    @service db;

    model({meet_id}) {
        return this.db.getMeet(meet_id);
    }
}
