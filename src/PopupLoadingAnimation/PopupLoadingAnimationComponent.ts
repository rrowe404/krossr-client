import { Component } from '@angular/core';
import { LoadingAnimationComponent } from '../LoadingAnimation/LoadingAnimationComponent';

/**
 * Just a wrapper for the loading animation
 * to prevent needing to be super repetitive in popup content templates
 */
@Component({
    selector: 'krossr-popup-loading-animation',
    templateUrl: './PopupLoadingAnimationView.html',
    imports: [LoadingAnimationComponent]
})
export class PopupLoadingAnimationComponent {
}
