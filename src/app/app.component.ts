import { Component } from '@angular/core';

@Component({
    selector: 'krossr-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    // eslint-disable-next-line @angular-eslint/prefer-standalone
    standalone: false
})
export class AppComponent {
  title = 'krossr-client';
}
