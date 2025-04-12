import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpComponent } from './HelpComponent';
import { MatDialogRef } from '@angular/material/dialog';

describe('HelpComponent', () => {
    let fixture: ComponentFixture<HelpComponent>;
    let component: HelpComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: MatDialogRef, useValue: { close: () => {} } }
            ]
        });

        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
