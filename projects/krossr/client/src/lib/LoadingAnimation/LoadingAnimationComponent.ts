import { Component, DoCheck, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'krossr-loading-animation',
    styleUrls: ['./LoadingAnimationStyles.less'],
    templateUrl: './LoadingAnimationView.html'
})
export class LoadingAnimationComponent implements DoCheck {
    @Input() public condition: boolean;
    @Input() public pulse = true;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        this.element = this.elementRef.nativeElement;
    }

    private element: HTMLElement;

    ngDoCheck() {
        if (this.condition) {
            this.renderer.removeClass(this.element, 'hidden');
        } else {
            this.renderer.addClass(this.element, 'hidden');
        }
    }
}
