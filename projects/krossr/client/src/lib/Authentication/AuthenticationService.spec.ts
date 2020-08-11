import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from './AuthenticationService';
import { UserViewModel } from '@krossr/types';

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