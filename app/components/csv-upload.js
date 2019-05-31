import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp'
import { parse } from 'papaparse';
import { inject as service } from '@ember/service';

export default class CsvUploadComponent extends Component {
    @service db;
    @tracked name;
    @action
    async uploadCSV({ currentTarget }) {
        let file = currentTarget.files[0];
        this.name = file.name;
        this.readFile(file).then(({ data }) => {
            let meet = {
                name: this.name
            };
            this.db.addMeet(meet).then((meetId) => {
                console.log("added meet and entries");
                this.db.addEntries(data, meetId).then(() => {
                    console.log("entries added");
                });
            });

        });
    }
    didInsertElement() {
        super.didInsertArguments(...arguments);
        console.log('didInsertElement');
    }

    readFile(file) {
        return new Promise(function (resolve, reject) {
            parse(file, {
                header: true,
                complete: function (results) { resolve(results); },
                error: function (e) { reject(e.target.result); },
            });
        });
    }
}
