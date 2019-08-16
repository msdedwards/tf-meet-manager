import Route from '@ember/routing/route';

export default class MeetInputRoute extends Route {
  model() {
    return this.modelFor("meet");
  }
}
