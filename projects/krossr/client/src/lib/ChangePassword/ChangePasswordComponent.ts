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
    public currentPasswordFormControl: FormControl;
    public newPasswordFormControl: FormControl;
    public verifyPasswordFormControl: FormControl;

    defaultMessage = 'Save Password';
    public error: string;

    constructor(private changePasswordService: ChangePasswordService) {
        super();
    }

    ngOnInit() {
        this.currentPasswordFormControl = new FormControl('', [Validators.required]);
        this.newPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]);
        this.verifyPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]);
        this.formGroup.addControl('current', this.currentPasswordFormControl);
        this.formGroup.addControl('newPassword', this.newPasswordFormControl);
        this.formGroup.addControl('verify', this.verifyPasswordFormControl);
    }

    /** Change user password */
    changeUserPassword() {
        this.success = '';
        this.error = '';

        this.successMessage = 'Password Saved!';

        return this.changePasswordService.changePassword(
            this.currentPasswordFormControl.value,
            this.newPasswordFormControl.value,
            this.verifyPasswordFormControl.value
        ).then(() => {
            this.clearForm();
            this.displaySuccessMessage();
        }).catch((response: KrossrError) => {
            this.displayErrorMessage(response);
        });
    }
}
