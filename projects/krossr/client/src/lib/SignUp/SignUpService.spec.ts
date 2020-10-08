import { SignUpService } from './SignUpService';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from '../Authentication/AuthenticationService';

describe('SignUpService', () => {
    let service: SignUpService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(SignUpService);
    });

    it('should sign up and sign in', () => {
        let authenticationService: AuthenticationService = TestBed.inject(AuthenticationService);
        spyOn(authenticationService, 'signIn').and.returnValue();

        let promise = service.signUp('username', 'email@server.com', 'password').then(() => {
            expect(authenticationService.signIn).toHaveBeenCalledWith({ id: 1, username: 'Rosalyn' });
        });

        httpTestingController
            .expectOne('auth/signup')
            .flush({ id: 1, username: 'Rosalyn' });

        return promise;
    });
});
