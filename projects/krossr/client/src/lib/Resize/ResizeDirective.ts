import { debounce } from '../Debounce/Debounce';
import { Inject, Directive, OnInit } from '@angular/core';
import { ResizeEventService } from './ResizeEventService';
import { WINDOW } from '../Window/WindowService';

@Directive({
    selector: '[krossrResize]'
})
export class ResizeDirective implements OnInit {
    constructor(
        @Inject(WINDOW) private window: Window,
        private resizeEventService: ResizeEventService
    ) {
    }

    public ngOnInit() {
        let resizeFn = debounce(() => {
            this.resizeEventService.windowResized.emit();
        });

        this.window.addEventListener('resize', () => {
            resizeFn.next();
        });
    }
}
