import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { DefaultService, ResetPasswordBodyViewModel } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    constructor(
        private authenticationService: AuthenticationService,
        private api: DefaultService
    ) {
    }

    async resetPassword(token: string, passwordDetails: ResetPasswordBodyViewModel) {
        let response = await this.api.reset(token, passwordDetails).toPromise();
        return this.authenticationService.signIn(response);
    }
    
    async validateToken(token: string) {
        let response = await this.api.validateResetToken(token).toPromise();
        return response.valid;
    }
}
