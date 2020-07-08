import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { HttpClient } from '@angular/common/http';
import { UserViewModel, ResetValidationViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    resetPassword(token: string, passwordDetails: { newPassword: string, verifyPassword: string }) {
        return this.httpClient.post(`auth/reset/${token}`, passwordDetails).toPromise().then((response: UserViewModel) => {
            return this.authenticationService.signIn(response);
        });
    }

    validateToken(token: string) {
        return this.httpClient.get(`auth/reset/${token}`).toPromise().then((response: ResetValidationViewModel) => response.valid);
    }
}
