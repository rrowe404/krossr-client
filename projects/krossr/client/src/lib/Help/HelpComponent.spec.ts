import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpComponent } from './HelpComponent';
import { HelpModule } from './HelpModule';
import { MatDialogRef } from '@angular/material/dialog';

describe('HelpComponent', () => {
    let fixture: ComponentFixture<HelpComponent>;
    let component: HelpComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HelpModule
            ],
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
