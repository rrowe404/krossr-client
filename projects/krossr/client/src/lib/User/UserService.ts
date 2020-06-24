import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../Authentication/AuthenticationService';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    getLoggedInUser() {
        return this.httpClient.get('users/me').toPromise().then(response => {
            this.authenticationService.signIn(response);
        });
    }

    updateUser(email: string) {
        return this.httpClient.put('users', { email }).toPromise().then(response => {
            return this.authenticationService.signIn(response);
        });
    }
}
