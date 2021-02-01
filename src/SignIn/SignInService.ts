import { AuthenticationService } from '../Authentication/AuthenticationService';
import { Injectable } from '@angular/core';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class SignInService {
    constructor(
        private api: DefaultService,
        private authenticationService: AuthenticationService
    ) {
    }

    async signIn(username: string, password: string): Promise<void> {
        let response = await this.api.signIn({
            username,
            password
        }).toPromise();

        this.authenticationService.signIn(response);
    }
}
