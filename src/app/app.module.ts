import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KrossrModule } from 'src/KrossrModule';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WithCredentialsInterceptor } from 'src/WithCredentialsInterceptor/WithCredentialsInterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KrossrModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
