import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FrontpageComponent } from './frontpage/frontpage.component';

@NgModule({
  declarations: [

    FrontpageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [FrontpageComponent]
})
export class AppModule { }
