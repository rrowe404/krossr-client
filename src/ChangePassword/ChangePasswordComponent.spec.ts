import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './ChangePasswordComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangePasswordModule } from './ChangePasswordModule';
import { ChangePasswordService } from './ChangePasswordService';
import { TestHelpers } from 'src/test/TestHelpers';

describe('ChangePasswordComponent', () => {
    let fixture: ComponentFixture<ChangePasswordComponent>;
    let component: ChangePasswordComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ChangePasswordModule,
                HttpClientTestingModule
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should change password', async () => {
        component.currentPasswordFormControl.setValue('current');
        component.newPasswordFormControl.setValue('replacement');
        component.verifyPasswordFormControl.setValue('replacement');

        let changePasswordService: ChangePasswordService = TestBed.inject(ChangePasswordService);
        spyOn(changePasswordService, 'changePassword').and.returnValue(Promise.resolve({}));

        await component.submit();
        expect(component.success).toBeTruthy();
        expect(component.buttonText()).toBe('Password Saved!');
    });

    it('should error if changing the password fails', async () => {
        let changePasswordService: ChangePasswordService = TestBed.inject(ChangePasswordService);

        let errorMessage = 'massive failure';

        spyOn(changePasswordService, 'changePassword').and.returnValue(TestHelpers.getErrorResponse(errorMessage));

        await component.submit();
        expect(component.error).toBe(errorMessage);
    });
});
