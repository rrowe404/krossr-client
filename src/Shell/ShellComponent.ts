import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ShiftService } from '../Shift/ShiftService';

@Component({
    selector: 'krossr-shell',
    styleUrls: ['./ShellStyles.less'],
    templateUrl: './ShellView.html',
    // eslint-disable-next-line @angular-eslint/prefer-standalone
    standalone: false
})
export class ShellComponent implements OnInit, OnDestroy {
    constructor(
        private renderer: Renderer2,
        private shiftService: ShiftService
    ) {
    }

    private $element: HTMLElement;
    private listeners: Array<() => void> = [];

    ngOnInit(): void {
        this.listeners = [
            this.renderer.listen(document, 'keydown', (e) => this.keydown(e)),
            this.renderer.listen(document, 'keyup', (e) => this.keyup(e))
        ];
    }

    ngOnDestroy(): void {
        this.listeners.forEach(listener => listener());
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
