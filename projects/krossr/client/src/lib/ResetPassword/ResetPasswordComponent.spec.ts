import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './ResetPasswordComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResetPasswordModule } from './ResetPasswordModule';
import { ResetPasswordService } from './ResetPasswordService';

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
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should reset the user password', async () => {
        let resetPasswordService: ResetPasswordService = TestBed.inject(ResetPasswordService);
        spyOn(resetPasswordService, 'resetPassword').and.returnValue(Promise.resolve());

        await component.submit();
        expect(component.success).toBeTruthy();
    });

    it('should handle an error', async () => {
        let resetPasswordService: ResetPasswordService = TestBed.inject(ResetPasswordService);

        spyOn(resetPasswordService, 'resetPassword').and.returnValue(Promise.reject({
            error: {
                message: 'Passwords do not match!'
            }
        }));

        await component.submit();
        expect(component.error).toBeTruthy();
    });
});
