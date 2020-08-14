import { ModeSelectorComponent } from "./ModeSelectorComponent";
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ModeSelectorComponent', () => {
    let fixture: ComponentFixture<ModeSelectorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ModeSelectorComponent
            ]
        });

        fixture = TestBed.createComponent(ModeSelectorComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    })
});