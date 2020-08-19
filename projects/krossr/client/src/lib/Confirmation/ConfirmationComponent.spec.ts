import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationComponent } from './ConfirmationComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationModule } from './ConfirmationModule';

describe('ConfirmationComponent', () => {
    let fixture: ComponentFixture<ConfirmationComponent>;
    let component: ConfirmationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ConfirmationModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmationComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
