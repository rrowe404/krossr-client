import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './ForgotPasswordComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordModule } from './ForgotPasswordModule';
import { ForgotPasswordService } from './ForgotPasswordService';
import { TestHelpers } from 'src/test/TestHelpers';

describe('ForgotPasswordComponent', () => {
    let fixture: ComponentFixture<ForgotPasswordComponent>;
    let component: ForgotPasswordComponent;

    function getFixture(setup?: (instance: ForgotPasswordComponent) => void) {
        fixture = TestBed.createComponent(ForgotPasswordComponent);

        if (setup) {
            setup(fixture.componentInstance);
        }

        fixture.detectChanges();
        return fixture;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ForgotPasswordModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: { close: () => {} } }
            ]
        }).compileComponents();

        fixture = getFixture();
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should close', () => {
        let fn = () => component.close();
        expect(fn).not.toThrow();
    });

    it('should display appropriate text on success', () => {
        component.success = 'Submitted!';
        expect(component.buttonText()).toBe('Submitted!');
    });

    it('should ask for password reset', async () => {
        component.usernameFormControl.setValue('mumbojumbo');

        let forgotPasswordService: ForgotPasswordService = TestBed.inject(ForgotPasswordService);

        spyOn(forgotPasswordService, 'sendForgotPasswordRequest').and.returnValue(Promise.resolve({}));
        spyOn(component, 'close');

        await component.submit();
        expect(component.close).toHaveBeenCalled();
    });

    it('should catch an error asking for password reset', async () => {
        component.usernameFormControl.setValue('banjokazooie');

        let forgotPasswordService: ForgotPasswordService = TestBed.inject(ForgotPasswordService);

        spyOn(forgotPasswordService, 'sendForgotPasswordRequest').and.returnValue(TestHelpers.getErrorResponse('dumb bear'));

        await component.submit();
        expect(component.error).toBeTruthy();
    });

    it('should initialize the username if possible', () => {
        let fixture2 = getFixture(instance => instance.data = { username: 'grunty' });
        expect(fixture2.componentInstance.usernameFormControl.value).toBe('grunty');
    });
});
