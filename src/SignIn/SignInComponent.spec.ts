import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './SignInComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SignInModule } from './SignInModule';
import { SignInService } from './SignInService';

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
                {
                    provide: MatDialogRef, useValue: {
                        open: () => { }
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should open the forgot password screen', () => {
        let dialogService = TestBed.inject(MatDialog);

        spyOn(component, 'close');
        spyOn(dialogService, 'open');

        component.openForgotPassword();
        expect(component.close).toHaveBeenCalled();
        expect(dialogService.open).toHaveBeenCalled();
    });

    it('should sign in and close', async () => {
        let signInService: SignInService = TestBed.inject(SignInService);
        spyOn(component, 'close');
        spyOn(signInService, 'signIn').and.returnValue(Promise.resolve());

        component.username.setValue('rosalyn');
        component.password.setValue('hunter2');

        await component.submit();
        expect(component.close).toHaveBeenCalled();
    });

    it('should handle an error signing in', async () => {
        let signInService: SignInService = TestBed.inject(SignInService);
        spyOn(signInService, 'signIn').and.returnValue(Promise.reject({ message: 'nope' }));

        await component.submit();
        expect(component.error).toBe('nope');
    });
});
