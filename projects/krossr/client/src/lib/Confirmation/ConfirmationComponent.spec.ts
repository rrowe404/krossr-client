import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationComponent } from './ConfirmationComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmationComponent', () => {
    let fixture: ComponentFixture<ConfirmationComponent>;
    let component: ConfirmationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                HttpClientTestingModule
            ],
            declarations: [ ConfirmationComponent ],
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
