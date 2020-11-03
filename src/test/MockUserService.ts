import { Injectable } from '@angular/core';
import { UserService } from 'src/User/UserService';

@Injectable()
export class MockUserService extends UserService {
    getLoggedInUser() {
        return Promise.resolve(null);
    }
}
