import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | detector', function (hooks) {
  setupRenderingTest(hooks);

  /** @this TestContext */
  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Detector />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Detector>
        template block text
      </Detector>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
