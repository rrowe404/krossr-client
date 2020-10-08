import { Component, Input } from '@angular/core';

/**
 * basically ng-content that displays a loading animation until it is ready
 */
@Component({
    selector: 'krossr-async-content',
    templateUrl: './AsyncContentView.html'
})
export class AsyncContentComponent {
    @Input() public isReady: boolean;
}
