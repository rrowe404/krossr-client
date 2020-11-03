import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { HttpClient } from '@angular/common/http';
import { UserViewModel, ResetValidationViewModel, ResetPasswordBodyViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    constructor(
        private authenticationService: AuthenticationService,
        private httpClient: HttpClient
    ) {
    }

    async resetPassword(token: string, passwordDetails: ResetPasswordBodyViewModel) {
        let response = await this.httpClient.post(`auth/reset/${token}`, passwordDetails).toPromise() as UserViewModel;
        return this.authenticationService.signIn(response);
    }

    async validateToken(token: string) {
        let response = await this.httpClient.get(`auth/reset/${token}`).toPromise() as ResetValidationViewModel;
        return response.valid;
    }
}
