/** Popup to change email/password or log out */

import { Input, Component, Inject, Optional, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForgotPasswordService } from './ForgotPasswordService';
import { KrossrFormBase } from '../KrossrForm/KrossrFormBase';
import { KrossrError } from '@krossr/types';
import { nowAndLater } from '../Debounce/Debounce';

@Component({
    selector: 'krossr-forgot-password',
    templateUrl: './ForgotPasswordView.html'
})
export class ForgotPasswordComponent extends KrossrFormBase implements OnInit {
    @Input() public invalid = false;

    public username: string;

    public success: boolean;
    public error: string;

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

        return this.forgotPasswordService.sendForgotPasswordRequest(this.usernameFormControl.value).then(() => {
            this.clearForm();

            // Show user success message and clear form
            nowAndLater(() => this.success = true, () => this.close());
        }).catch((response: KrossrError) => {
            // Show user error message and clear form
            this.clearForm();
            nowAndLater(() => this.error = response.error.message, () => this.error = '');
        });
    }

    askForResetButtonText() {
        if (this.success) {
            return 'Submitted!';
        }

        return this.error || 'Submit';
    }
}
