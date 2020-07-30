import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangePasswordService } from './ChangePasswordService';
import { MinPasswordLength } from '../Password/MinPasswordLength';
import { KrossrFormBase } from '../KrossrForm/KrossrFormBase';
import { KrossrError } from '@krossr/types';

@Component({
    selector: 'krossr-change-password',
    templateUrl: './ChangePasswordView.html'
})
export class ChangePasswordComponent extends KrossrFormBase implements OnInit {
    public minPasswordLength = MinPasswordLength.value;
    public formGroup: FormGroup;
    public currentPasswordFormControl: FormControl;
    public newPasswordFormControl: FormControl;
    public verifyPasswordFormControl: FormControl;

    public success: boolean;
    public error: string;
    private timeout = 1000;

    constructor(private changePasswordService: ChangePasswordService) {
        super();
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.currentPasswordFormControl = new FormControl('', [Validators.required]);
        this.newPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]);
        this.verifyPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]);
        this.formGroup.addControl('current', this.currentPasswordFormControl);
        this.formGroup.addControl('newPassword', this.newPasswordFormControl);
        this.formGroup.addControl('verify', this.verifyPasswordFormControl);
    }

    /** Change user password */
    changeUserPassword() {
        this.success = false;
        this.error = '';

        this.changePasswordService.changePassword(
            this.currentPasswordFormControl.value,
            this.newPasswordFormControl.value,
            this.verifyPasswordFormControl.value
        ).then(() => {
            this.success = true;
            this.clearForm();

            setTimeout(() => {
                this.success = false;
            }, this.timeout);
        }).catch((response: KrossrError) => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = '';
            }, this.timeout);
        });
    }

    changePasswordButtonText() {
        if (this.success) {
            return 'Password Saved!';
        }

        return this.error || 'Save Password';
    }

    updateCurrentPassword(currentPassword: string) {
        this.currentPasswordFormControl.setValue(currentPassword);
    }

    updateNewPassword(newPassword: string) {
        this.newPasswordFormControl.setValue(newPassword);
    }

    updateVerifyPassword(verifyPassword: string) {
        this.verifyPasswordFormControl.setValue(verifyPassword);
    }
}
