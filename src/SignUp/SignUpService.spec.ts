import { SignUpService } from './SignUpService';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { BASE_PATH } from '@krossr/api';

describe('SignUpService', () => {
    let service: SignUpService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: BASE_PATH, useValue: '' }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(SignUpService);
    });

    it('should sign up and sign in', async () => {
        let authenticationService: AuthenticationService = TestBed.inject(AuthenticationService);
        spyOn(authenticationService, 'signIn').and.returnValue();

        let promise = service.signUp('username', 'email@server.com', 'password');

        httpTestingController
            .expectOne('/auth/signup')
            .flush({ id: 1, username: 'Rosalyn' });

        await promise;
        expect(authenticationService.signIn).toHaveBeenCalledWith({ id: 1, username: 'Rosalyn' });
    });
});
