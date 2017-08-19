import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class DataProvider {

  db: PouchDB = null;
  remote: string;

  constructor() {

  }

  initDatabase(remote): void {

    this.db = new PouchDB('hangzdb', {
      auto_compaction: true
    });
    this.remote = remote;
    this.initRemoteSync();

  }

  initRemoteSync(): void {

    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    let options = {
      live: true,
      retry: true,
      filter: 'app/after_date',
      query_params: { 'afterDate': oneWeekAgo }
    };
    this.db.sync(this.remote, options);

  }

  createDoc(doc): Promise<any> {

    return this.db.post(doc);

  }

  updateDoc(doc): Promise<any> {

    return this.db.put(doc);

  }

  deleteDoc(doc): Promise<any> {

    return this.db.remove(doc);

  }

}
