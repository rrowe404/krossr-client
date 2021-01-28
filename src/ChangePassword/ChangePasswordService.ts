import { Injectable } from '@angular/core';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class ChangePasswordService {
    constructor(private api: DefaultService) {
    }

    changePassword(currentPassword, newPassword, verifyPassword) {
        return this.api.changePassword({
            currentPassword,
            newPassword,
            verifyPassword
        }).toPromise();
    }
}
