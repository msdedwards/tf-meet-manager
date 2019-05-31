import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | meets/download', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:meets/download');
    assert.ok(route);
  });
});
