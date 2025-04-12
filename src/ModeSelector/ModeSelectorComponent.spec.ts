import { ModeSelectorComponent } from './ModeSelectorComponent';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ModeSelectorComponent', () => {
    let fixture: ComponentFixture<ModeSelectorComponent>;
    let component: ModeSelectorComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [ModeSelectorComponent]
});

        fixture = TestBed.createComponent(ModeSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should select each mode without error', () => {
        let test = () => {
            Object.keys(component.modes).forEach(mode => component.selectMode(component.modes[mode]));
        };

        expect(test).not.toThrow();
    });
});
