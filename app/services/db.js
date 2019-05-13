import Service from '@ember/service';
import { openDB } from 'idb';

export default class DbService extends Service {
    _idb = openDB('xmm', 1, {
        upgrade(db) {
            // Create a store of objects
            db.createObjectStore('meets', {
                keyPath: 'name',
            });
            // Create an index on the 'date' property of the objects.
            // store.createIndex('FirstName', 'string');
        }
    });

    get idb() {
        return this._idb;
    }

    async addEntry(entry) {
        let idb = await this.idb;
        idb.add('entries', entry);
    }
    
    async addMeet(meet) {
        let idb = await this.idb;
        idb.add('meets', meet);
    }

    async getMeet(meetName) {
        let idb = await this.idb;
        return idb.get('meets', meetName).then((data) => {
            console.log({data});
            return data;
        });
    }

    async getAllMeets() {
        let idb = await this.idb;
        return idb.getAllKeys('meets');
    }
}
