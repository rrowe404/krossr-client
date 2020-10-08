import { AuthenticationService } from '../Authentication/AuthenticationService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class SignInService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    async signIn(username: string, password: string): Promise<void> {
        let response = await this.httpClient.post('auth/signin', {
            username,
            password
        }).toPromise() as UserViewModel;

        this.authenticationService.signIn(response);
    }
}
