import { Component } from "@angular/core";
import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { ResizeDirective } from './ResizeDirective';
import { ResizeEventService } from './ResizeEventService';

@Component({
    template: `<div krossrResize></div>`
})
class ResizeDirectiveTestComponent {
}

describe('ResizeDirective', () => {
    let fixture: ComponentFixture<ResizeDirectiveTestComponent>;
    let component: ResizeDirectiveTestComponent;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ResizeDirective,
                ResizeDirectiveTestComponent
            ],
            providers: [
                { provide: 'window', useValue: window }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ResizeDirectiveTestComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement.nativeElement as HTMLElement;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should respond to a resize event', fakeAsync(() => {
        let resizeEventService: ResizeEventService = TestBed.inject(ResizeEventService);
        spyOn(resizeEventService.windowResized, 'emit');

        let event = new Event('resize');
        window.dispatchEvent(event);

        tick(250);
        fixture.detectChanges();

        expect(resizeEventService.windowResized.emit).toHaveBeenCalled();
    }));
});