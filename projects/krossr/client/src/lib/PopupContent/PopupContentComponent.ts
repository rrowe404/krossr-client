import { Component, Input } from '@angular/core';

@Component({
    selector: 'krossr-popup-content',
    styleUrls: ['./PopupContentStyles.less'],
    templateUrl: './PopupContentView.html'
})
export class PopupContentComponent {
    @Input() public isReady = true;
}
