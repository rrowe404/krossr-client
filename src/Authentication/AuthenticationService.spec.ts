import { TestBed } from '@angular/core/testing';
import { UserViewModel } from '@krossr/api';
import { AuthenticationService } from './AuthenticationService';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthenticationService);
    });

    it('should sign a user in', () => {
        let user: UserViewModel = { id: 1, username: 'Test' };
        service.signIn(user);
        expect(service.user).toBe(user);
    });

    it('should sign a user out', () => {
        service.signOut();
        expect(service.user).toBeNull();
    });
});
