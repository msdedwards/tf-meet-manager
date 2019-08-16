import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | meet/input/division', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:meet/input/division');
    assert.ok(route);
  });
});
