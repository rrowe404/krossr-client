// TODO form should not be red after successful change

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from './ResetPasswordService';
import { MinPasswordLength } from '../Password/MinPasswordLength';

@Component({
    selector: 'reset-password',
    templateUrl: './ResetPasswordView.html'
})
export class ResetPasswordComponent implements OnInit {
    @Input() token: string;

    public success: string;
    public error: string;

    public formGroup: FormGroup;
    public newPasswordFormControl: FormControl;
    public verifyPasswordFormControl: FormControl;

    constructor(
        private resetPasswordService: ResetPasswordService
    ) {
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.newPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(MinPasswordLength.value)]);
        this.verifyPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(MinPasswordLength.value)]);
        this.formGroup.addControl('newPassword', this.newPasswordFormControl);
        this.formGroup.addControl('verifyPassword', this.verifyPasswordFormControl);
    }

    // Change user password
    resetUserPassword() {
        this.success = this.error = null;

        this.resetPasswordService.resetPassword(this.token, {
            newPassword: this.newPasswordFormControl.value,
            verifyPassword: this.verifyPasswordFormControl.value
        }).then(() => {
            this.clearForm();
            this.success = `Password updated!`;
        }).catch((response) => {
            this.error = response.error.message;
        });
    }

    private clearForm() {
        this.updateNewPassword('');
        this.updateVerifyPassword('');
    }

    public updateNewPassword(newPassword: string) {
        this.newPasswordFormControl.setValue(newPassword);
    }

    public updateVerifyPassword(verifyPassword: string) {
        this.verifyPasswordFormControl.setValue(verifyPassword);
    }
}
