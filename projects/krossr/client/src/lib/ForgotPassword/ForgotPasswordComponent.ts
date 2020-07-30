/** Popup to change email/password or log out */

import { Input, Component, Inject, Optional, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForgotPasswordService } from './ForgotPasswordService';
import { KrossrFormBase } from '../KrossrForm/KrossrFormBase';
import { KrossrError } from '@krossr/types';

@Component({
    selector: 'krossr-forgot-password',
    templateUrl: './ForgotPasswordView.html'
})
export class ForgotPasswordComponent extends KrossrFormBase implements OnInit {
    @Input() public invalid = false;

    public username: string;

    private success: boolean;
    private error: string;

    private timeout = 1000;

    public formGroup: FormGroup;
    public usernameFormControl: FormControl;

    constructor(
        @Optional() private matDialogRef: MatDialogRef<ForgotPasswordComponent>,
        private forgotPasswordService: ForgotPasswordService,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: { username: string }
    ) {
        super();
    }

    close() {
        if (this.matDialogRef) {
            this.matDialogRef.close();
        }
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.usernameFormControl = new FormControl(this.data ? this.data.username : '', [Validators.required]);
        this.formGroup.addControl('username', this.usernameFormControl);
    }

    // Submit forgotten password account id
    askForPasswordReset() {
        this.success = this.error = null;

        this.forgotPasswordService.sendForgotPasswordRequest(this.usernameFormControl.value).then(() => {
            // Show user success message and clear form
            this.clearForm();
            this.success = true;

            setTimeout(() => {
                this.close();
            }, this.timeout);
        }).catch((response: KrossrError) => {
            // Show user error message and clear form
            this.clearForm();
            this.error = response.error.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        });
    }

    askForResetButtonText() {
        if (this.success) {
            return 'Submitted!';
        }

        return this.error || 'Submit';
    }

    updateUsername(username: string) {
        this.usernameFormControl.setValue(username);
    }
}
