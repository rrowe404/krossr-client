import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { HttpClient } from '@angular/common/http';
import { UserViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    signUp(username: string, email: string, password: string) {
        return this.httpClient.post('auth/signup', {
            username,
            email,
            password
        }).toPromise().then((response: UserViewModel) => {
            return this.authenticationService.signIn(response);
        });
    }
}
