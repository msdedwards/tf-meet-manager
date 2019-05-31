import Service from '@ember/service';
import { openDB } from 'idb';

export default class DbService extends Service {
    _idb = openDB('xmm', 1, {
        upgrade(db) {
            // Create a store of objects
            db.createObjectStore('meets', {
                keyPath: 'id',
                autoIncrement: true
            });
            var entriesStore = db.createObjectStore("entries", {
                keyPath: 'id',
                autoIncrement: true
            });
            db.createObjectStore('results', {
                keyPath: 'id',
                autoIncrement: true
            });
            entriesStore.createIndex("meetId", "meetId", {
                unique: false,
                multiEntry: true
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

    async addEntries(entries, meetId) {
        let idb = await this.idb;
        const tx = idb.transaction('entries', 'readwrite');
        for (let i = 0; i < entries.length; i++) {
            tx.store.add({ meetId, ...entries[i] });
        }
        await tx.done;
    }

    async addMeet(meet) {
        let idb = await this.idb;
        return idb.add('meets', meet);
    }

    async getMeet(meetId) {
        let idb = await this.idb;
        return idb.get('meets', meetId);
    }

    async getAllMeets() {
        let idb = await this.idb;
        return idb.getAll('meets');
    }

    async getEntriesByMeetId(meetId) {
        let idb = await this.idb;
        var tx = idb.transaction('entries', 'readonly')
        var index = tx.store.index('meetId')
        return await index.getAll(Number(meetId));
    }
}
