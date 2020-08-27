import { UserService } from '@krossr/client';
import { Injectable } from '@angular/core';

@Injectable()
export class MockUserService extends UserService {
    getLoggedInUser() {
        return Promise.resolve(null);
    }

    updateUser() {
        return Promise.resolve();
    }
}
