import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { UserViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    async getLoggedInUser() {
        let response = await this.httpClient.get('users/me').toPromise() as UserViewModel;
        this.authenticationService.signIn(response);
    }

    async updateUser(email: string) {
        let response = await this.httpClient.put('users', { email }).toPromise() as UserViewModel;
        this.authenticationService.signIn(response);
    }
}
