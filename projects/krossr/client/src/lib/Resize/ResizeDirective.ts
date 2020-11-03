import { debounce } from '../Debounce/Debounce';
import { Inject, Directive, OnInit } from '@angular/core';
import { ResizeEventService } from './ResizeEventService';
import { WINDOW } from '../Window/WindowService';

@Directive({
    selector: '[krossrResize]'
})
export class ResizeDirective implements OnInit {
    private _window: Window;

    constructor(
        @Inject(WINDOW) window: any,
        private resizeEventService: ResizeEventService
    ) {
        this._window = window;
    }

    public ngOnInit() {
        let resizeFn = debounce(() => {
            this.resizeEventService.windowResized.emit();
        });

        this._window.addEventListener('resize', () => {
            resizeFn.next();
        });
    }
}
