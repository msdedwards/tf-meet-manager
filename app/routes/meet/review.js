import Route from '@ember/routing/route';

export default class MeetReviewRoute extends Route {
  model() {
    return this.modelFor("meet");
  }
}
