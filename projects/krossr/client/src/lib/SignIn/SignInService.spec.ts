import { SignInService } from "./SignInService";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from '../Authentication/AuthenticationService';

describe('SignInService', () => {
    let service: SignInService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(SignInService);
    });

    it('should sign up and sign in', () => {
        let authenticationService: AuthenticationService = TestBed.inject(AuthenticationService);
        spyOn(authenticationService, 'signIn').and.returnValue();

        let promise = service.signIn('username', 'password').then(() => {
            expect(authenticationService.signIn).toHaveBeenCalledWith({ id: 1, username: 'Rosalyn' });
        });

        const req = httpTestingController.expectOne('auth/signin');

        req.flush({ id: 1, username: 'Rosalyn' });

        return promise;
    });
});