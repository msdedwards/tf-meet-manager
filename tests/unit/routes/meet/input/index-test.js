import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | meet/input/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:meet/input/index');
    assert.ok(route);
  });
});
