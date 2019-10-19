import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
    @action
    didTransition() {
        this.controller.set('isActive', false);
        return false; // Do not bubble the didTransition event
    }
}