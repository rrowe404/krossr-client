import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './ForgotPasswordComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordModule } from './ForgotPasswordModule';

describe('ForgotPasswordComponent', () => {
    let fixture: ComponentFixture<ForgotPasswordComponent>;
    let component: ForgotPasswordComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ForgotPasswordModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ForgotPasswordComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
