import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class MeetRoute extends Route {
    @service db;

    model({ meet_id }) {
        return hash({
            entries: this.db.getEntriesByMeetId(meet_id),
            meet: this.db.getMeet(meet_id)
        });
    }
}
