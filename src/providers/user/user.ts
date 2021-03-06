import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

  public currentUser: any = false;

  constructor(public storage: Storage) {
    console.log('Hello UserProvider Provider');
  }

  saveUserData(data): void {

    this.currentUser = data;
    this.storage.set('hangzUserData', data);

  }

  getUserData(): Promise<any> {

    return this.storage.get('hangzUserData');
    
  }

}
