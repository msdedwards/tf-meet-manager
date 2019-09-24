import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

/** @this RouterDSL */
Router.map(function () {
  this.route('meets', function () {
    this.route('download');
  });
  this.route('import');
  this.route('meet', { path: 'meet/:meet_id' }, function () {
    this.route('print');
    this.route('input', function () {
      this.route('division', { path: 'division/:division_id' }, function () {
        this.route('name', function () {
          this.route('manual');
          this.route('auto');
        });
        this.route('time', function () {
          this.route('manual');
          this.route('auto');
        });
        this.route('review');
      });
    });
  });
});

export default Router;
