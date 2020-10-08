import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../Authentication/AuthenticationService';

@Injectable({
    providedIn: 'root'
})
export class SignOutService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    async signout(): Promise<void> {
        await this.httpClient.post('auth/signout', {}).toPromise();

        this.authenticationService.signOut();
    }
}
