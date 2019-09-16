import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
    beforeModel(...args) {
        this._super(args);
    }
}