import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  chats: Object[] = [];
  message: string = '';

  constructor(public navCtrl: NavController,
    private chatProvider: ChatProvider) {

  }

  ionViewDidLoad() {

    this.chatProvider.init();
    this.chatProvider.getChats().subscribe((chats) => {
      this.chats = chats;
      if(this.chats.length === 0) {
        this.chats.push({
          author: 'Hangz Admin',
          message: 'Looks like nobody is around. Type a message below to start chatting!'
        });
      }
    });

  }
  addChat(): void {

    if(this.message.length > 0) {
      let iso = this.getDateISOString();
      this.chatProvider.addChat({
        message: this.message,
        author: 'joshmorony',
        dateCreated: iso
      });
      this.message = '';
    }
    
  }

  getDateISOString(): string {

    return new Date().toISOString();

  }

}
