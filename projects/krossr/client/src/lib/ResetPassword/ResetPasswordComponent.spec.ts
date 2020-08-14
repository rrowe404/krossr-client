import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './ResetPasswordComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResetPasswordComponent', () => {
    let fixture: ComponentFixture<ResetPasswordComponent>;
    let component: ResetPasswordComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [ ResetPasswordComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(ResetPasswordComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
