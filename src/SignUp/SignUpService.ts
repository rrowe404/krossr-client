import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    constructor(
        private authenticationService: AuthenticationService,
        private api: DefaultService
    ) {
    }

    async signUp(username: string, email: string, password: string) {
        let response = await this.api.signUp({
            username,
            email,
            password
        }).toPromise();

        this.authenticationService.signIn(response);
    }
}
