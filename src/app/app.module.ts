import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DataProvider } from '../providers/data/data';
import { NoticesProvider } from '../providers/notices/notices';
import { ChatProvider } from '../providers/chat/chat';
import { UserProvider } from '../providers/user/user';
import { AuthProvider } from '../providers/auth/auth';
import { UsernameValidator } from '../validators/username';
import { EmailValidator } from '../validators/email';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
      preLoadModules: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    NoticesProvider,
    ChatProvider,
    UserProvider,
    AuthProvider,
    UsernameValidator,
    EmailValidator
  ]
})
export class AppModule {}
