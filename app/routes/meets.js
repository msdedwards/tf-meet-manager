import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MeetsRoute extends Route {
    @service db;

    model() {
        return this.db.getAllMeets();
    }
}
