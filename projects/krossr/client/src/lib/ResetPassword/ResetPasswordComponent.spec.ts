import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './ResetPasswordComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResetPasswordModule } from './ResetPasswordModule';

describe('ResetPasswordComponent', () => {
    let fixture: ComponentFixture<ResetPasswordComponent>;
    let component: ResetPasswordComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ResetPasswordModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ResetPasswordComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
