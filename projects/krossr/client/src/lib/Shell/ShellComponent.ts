import { Component } from '@angular/core';
import { ShiftService } from '../Shift/ShiftService';

@Component({
    selector: 'krossr-shell',
    styleUrls: ['./ShellStyles.less'],
    templateUrl: './ShellView.html'
})
export class ShellComponent {
    constructor(
        private shiftService: ShiftService
    ) {
    }

    keydown($event: KeyboardEvent) {
        if ($event.shiftKey) {
            this.shiftService.shiftOn = true;
        }
    }

    keyup($event: KeyboardEvent) {
        if (!$event.shiftKey) {
            this.shiftService.shiftOn = false;
        }
    }
}
