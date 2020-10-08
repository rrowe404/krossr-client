import { TestBed } from '@angular/core/testing';
import { SignOutService } from './SignOutService';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from '../Authentication/AuthenticationService';

describe('SignOutService', () => {
    let service: SignOutService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(SignOutService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should sign out', async () => {
        let authenticationService: AuthenticationService = TestBed.inject(AuthenticationService);
        spyOn(authenticationService, 'signOut').and.returnValue();

        const req = httpTestingController.expectOne('auth/signout');
        await service.signout();

        req.flush({});
        expect(authenticationService.signOut).toHaveBeenCalled();
    });
});
