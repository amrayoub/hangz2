import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { ErrorMessagesComponent } from '../../components/error-messages/error-messages';

@NgModule({
  declarations: [
    RegisterPage,
    ErrorMessagesComponent
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
  ],
})
export class RegisterPageModule {}
