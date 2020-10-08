import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignOutService } from '../SignOut/SignOutService';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';
/** Popup to change email/password or log out */

@Component({
    selector: 'krossr-edit-profile',
    templateUrl: './EditProfileView.html'
})
export class EditProfileComponent extends KrossrDialogBase {
    constructor(
        protected matDialogRef: MatDialogRef<EditProfileComponent>,
        private signOutService: SignOutService
    ) {
        super(matDialogRef);
    }

    async signout() {
        await this.signOutService.signout();
        this.close();
    }
}
