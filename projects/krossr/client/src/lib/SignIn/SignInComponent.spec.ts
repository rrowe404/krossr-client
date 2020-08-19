import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './SignInComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { SignInModule } from './SignInModule';

describe('SignInComponent', () => {
    let fixture: ComponentFixture<SignInComponent>;
    let component: SignInComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                SignInModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SignInComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
