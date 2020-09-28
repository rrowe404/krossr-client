/** Popup to change email/password or log out */

import { Input, Component, Inject, Optional, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForgotPasswordService } from './ForgotPasswordService';
import { KrossrError } from '@krossr/types';
import { KrossrFormDialogBase } from '../KrossrFormDialog/KrossrFormDialogBase';

@Component({
    selector: 'krossr-forgot-password',
    templateUrl: './ForgotPasswordView.html'
})
export class ForgotPasswordComponent extends KrossrFormDialogBase implements OnInit {
    @Input() public invalid = false;

    defaultMessage = 'Submit';

    public username: string;
    public usernameFormControl: FormControl;

    constructor(
        @Optional() matDialogRef: MatDialogRef<ForgotPasswordComponent>,
        private forgotPasswordService: ForgotPasswordService,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: { username: string }
    ) {
        super(matDialogRef);
    }

    ngOnInit() {
        this.usernameFormControl = new FormControl(this.data ? this.data.username : '', [Validators.required]);
        this.formGroup.addControl('username', this.usernameFormControl);
    }

    // Submit forgotten password account id
    askForPasswordReset() {
        this.success = this.error = null;

        return this.forgotPasswordService.sendForgotPasswordRequest(this.usernameFormControl.value).then(() => {
            this.close();
        }).catch((response: KrossrError) => {
            // Show user error message and clear form
            this.clearForm();
            this.displayErrorMessage(response);
        });
    }
}
