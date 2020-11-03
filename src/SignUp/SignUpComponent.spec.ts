import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './SignUpComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SignUpModule } from './SignUpModule';

describe('SignUpComponent', () => {
    let fixture: ComponentFixture<SignUpComponent>;
    let component: SignUpComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                SignUpModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SignUpComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
