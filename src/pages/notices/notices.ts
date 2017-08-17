import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';
import { NoticesProvider } from '../../providers/notices/notices';

@IonicPage()
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html',
})
export class NoticesPage {

  notices: Object[] = [];

  constructor(private navCtrl: NavController,
    private noticesProvider: NoticesProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) {

  }

  ionViewDidLoad() {

    this.noticesProvider.init();
    this.noticesProvider.getNotices().subscribe((notices) => {
      this.notices = notices;
      if(this.notices.length === 0) {
        this.notices.push({
          author: 'Hangz Admin',
          title: 'Welcome!',
          message: 'Looks like there aren\'t any notices yet. Click the \'+\' symbold to add one.'
        });
      }
    });

  }

  openAddNoticePage(notice?): void {

    let modal = this.modalCtrl.create('AddNoticePage', {
      notice: notice
    });
    modal.present();
  }

  deleteNotice(notice): void {

    let confirm = this.alertCtrl.create({
      title: 'Delete this notice?',
      message: 'Deleting this notice will remove it permanently.',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.noticesProvider.deleteNotice(notice);
          }
        },
        {
          text: 'Keep it'
        }
      ]
    });
    confirm.present();

  }

}
