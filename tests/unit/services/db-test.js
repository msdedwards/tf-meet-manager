import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | db', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  /** 
   * Default Unit test
   * @this TestContext 
   * */
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:db');
    assert.ok(service);
  });
});
