import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'krossr-loading-animation',
    styleUrls: ['./LoadingAnimationStyles.less'],
    templateUrl: './LoadingAnimationView.html',
    imports: [NgClass]
})
export class LoadingAnimationComponent {
    @Input() public pulse = true;
}
