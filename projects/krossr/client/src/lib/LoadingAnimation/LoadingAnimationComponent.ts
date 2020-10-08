import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'krossr-loading-animation',
    styleUrls: ['./LoadingAnimationStyles.less'],
    templateUrl: './LoadingAnimationView.html'
})
export class LoadingAnimationComponent {
    @Input() public condition: boolean;
    @Input() public pulse = true;
}
