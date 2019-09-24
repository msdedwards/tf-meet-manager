import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | place-auto', function (hooks) {
  setupRenderingTest(hooks);

  /** @this TestContext */
  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<PlaceAuto />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <PlaceAuto>
        template block text
      </PlaceAuto>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
