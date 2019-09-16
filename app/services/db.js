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
            var resultStore = db.createObjectStore('results', {
                keyPath: 'id',
                autoIncrement: true
            });
            entriesStore.createIndex('meetId', 'meetId', {
                unique: false,
            });
            entriesStore.createIndex('meetId, DivNum, resultId', ['meetId', 'DivNum', 'resultId'], {
                unique: false,
                multiEntry: false
            });
            resultStore.createIndex('meetId, DivNum', ['entry.meetId', 'entry.DivNum'], {
                unique: false,
                multiEntry: false
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
        idb.put()
        idb.add('entries', entry);
    }

    async addEntries(entries, meetId) {
        let idb = await this.idb;
        const tx = idb.transaction('entries', 'readwrite');
        var item;
        for (let i = 0; i < entries.length; i++) {
            item = {
                meetId,
                resultId: -1,
                ...entries[i]
            };
            tx.store.add(item);
        }
        await tx.done;
    }

    async updateEntry(entry) {
        let idb = await this.idb;
        idb.put('entries', entry);
    }

    async updateResult(result) {
        let idb = await this.idb;
        idb.put('results', result);
    }

    async addMeet(meet) {
        let idb = await this.idb;
        return idb.add('meets', meet);
    }

    async addResult(result) {
        let idb = await this.idb;
        return idb.add('results', result);
    }

    async getMeet(meetId) {
        let idb = await this.idb;
        return idb.get('meets', Number(meetId));
    }

    async getAllMeets() {
        let idb = await this.idb;
        return idb.getAll('meets');
    }

    async getEntriesByMeetId(meetId) {
        let idb = await this.idb;
        var tx = idb.transaction('entries', 'readonly')
        var index = tx.store.index('meetId')
        return index.getAll(Number(meetId));
    }

    // async getEntriesByDivisionNum(meetId, DivNum) {
    //     let idb = await this.idb;
    //     var tx = idb.transaction('entries', 'readonly')
    //     var index = tx.store.index('meetId, DivNum, hasResult');
    //     return index.getAll([Number(meetId), DivNum]);
    // }

    async getEntries(meetId, DivNum, resultId = -1) {
        let idb = await this.idb;
        var tx = idb.transaction('entries', 'readonly')
        var index = tx.store.index('meetId, DivNum, resultId');
        return index.getAll([Number(meetId), DivNum, resultId]);
    }

    async getResultsByDivisionNum(meetId, DivNum) {
        let idb = await this.idb;
        var tx = idb.transaction('results', 'readonly')
        var index = tx.store.index('meetId, DivNum')
        return index.getAll([Number(meetId), DivNum]);
    }
}
