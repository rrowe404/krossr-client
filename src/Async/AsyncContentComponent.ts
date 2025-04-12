import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoadingAnimationComponent } from '../LoadingAnimation/LoadingAnimationComponent';

/**
 * basically ng-content that displays a loading animation until it is ready
 */
@Component({
    selector: 'krossr-async-content',
    templateUrl: './AsyncContentView.html',
    imports: [NgIf, LoadingAnimationComponent]
})
export class AsyncContentComponent {
    @Input() public isReady: boolean;
}
