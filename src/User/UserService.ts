import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private authenticationService: AuthenticationService,
        private api: DefaultService
    ) {
    }

    async getLoggedInUser() {
        let response = await this.api.me().toPromise();
        this.authenticationService.signIn(response);
    }

    async updateUser(email: string) {
        let response = await this.api.updateUser({ email }).toPromise();
        this.authenticationService.signIn(response);
    }
}
