import { Component, Input } from '@angular/core';

@Component({
    selector: 'krossr-button',
    styleUrls: ['./KrossrButtonStyles.less'],
    templateUrl: './KrossrButtonView.html'
})
export class KrossrButtonComponent {
    @Input() public disabled = false;
    @Input() public text: string;
    @Input() public buttonType = 'button';
}
