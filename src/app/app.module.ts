import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KrossrModule } from '@krossr/client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KrossrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
