import { Component, Input } from '@angular/core';
import { AsyncLoadedComponent } from '../Async/AsyncLoadedComponent';
import { NgIf } from '@angular/common';
import { PopupLoadingAnimationComponent } from '../PopupLoadingAnimation/PopupLoadingAnimationComponent';

@Component({
    selector: 'krossr-popup-content',
    styleUrls: ['./PopupContentStyles.less'],
    templateUrl: './PopupContentView.html',
    imports: [NgIf, PopupLoadingAnimationComponent]
})
export class PopupContentComponent implements AsyncLoadedComponent {
    @Input() public isReady = true;
}
