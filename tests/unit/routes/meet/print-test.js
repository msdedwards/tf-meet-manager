import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | meet/print', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:meet/print');
    assert.ok(route);
  });
});
