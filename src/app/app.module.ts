import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CbolaoPage } from '../pages/cbolao/cbolao';
import { DetailsPage } from '../pages/details/details';
import { BetPage } from '../pages/bet/bet';
import { ScoreboardPage } from '../pages/scoreboard/scoreboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CbolaoPage,
    DetailsPage,
    BetPage,
    ScoreboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CbolaoPage,
    DetailsPage,
    BetPage,
    ScoreboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
