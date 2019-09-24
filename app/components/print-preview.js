import Component from '@glimmer/component';
import { set } from '@ember/object';

/**
 * Print Preview Component
 * @class PrintPreviewComponent
 */
export default class PrintPreviewComponent extends Component {
    /**
    * Print Preview Constructor
    */
    constructor(...args) {
        super(...args);
        let entries = this.args.entries;
        this.pagedEntries = entries.reduce((acc, curr, i) => {
            set(curr, 'bibAddend', i);
            if (!(i % 30)) {
                acc.push(entries.slice(i, i + 30));
            }
            return acc;
        }, []);
    }
}
