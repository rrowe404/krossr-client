import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KrossrModule } from 'src/KrossrModule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KrossrModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
