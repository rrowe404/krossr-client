import { Injectable } from '@angular/core';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {
    constructor(
        private api: DefaultService
    ) {
    }

    sendForgotPasswordRequest(username: string) {
        return this.api.forgot({ username }).toPromise();
    }
}
