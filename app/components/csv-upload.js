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
        try {
            let file = currentTarget.files[0];
            this.name = file.name;
            var entries = await this.readFile(file);
            let meet = {
                name: this.name,
                hasInputNames: false,
                hasInputTimes: false
            };
            meet.divisions = new Set(entries.data.map((item) => item.DivNum))

            var meetId = await this.db.addMeet(meet);

            await this.db.addEntries(entries.data, meetId);
        } catch (error) {
            throw error;
        }
    }

    readFile(file) {
        return new Promise(function (resolve, reject) {
            parse(file, {
                header: true,
                skipEmptyLines: true,
                transformHeader: (header) => header.split(' ')[0],
                complete: resolve,
                error: (e) => reject(e.target.result),
            });
        });
    }
}
