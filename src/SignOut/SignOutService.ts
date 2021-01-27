import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class SignOutService {
    constructor(
        private api: DefaultService,
        private authenticationService: AuthenticationService
    ) {
    }

    async signout(): Promise<void> {
        await this.api.signOut().toPromise();

        this.authenticationService.signOut();
    }
}
