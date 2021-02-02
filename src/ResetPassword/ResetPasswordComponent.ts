import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from './ResetPasswordService';
import { MinPasswordLength } from '../Password/MinPasswordLength';
import { KrossrFormBase } from '../KrossrForm/KrossrFormBase';

@Component({
    selector: 'krossr-reset-password',
    templateUrl: './ResetPasswordView.html'
})
export class ResetPasswordComponent extends KrossrFormBase implements OnInit {
    @Input() token: string;

    defaultMessage = 'Update Password';
    successMessage = 'Password updated!';

    public newPasswordFormControl: FormControl;
    public verifyPasswordFormControl: FormControl;

    constructor(
        private resetPasswordService: ResetPasswordService
    ) {
        super();
    }

    ngOnInit() {
        this.newPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(MinPasswordLength.value)]);
        this.verifyPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(MinPasswordLength.value)]);
        this.formGroup.addControl('newPassword', this.newPasswordFormControl);
        this.formGroup.addControl('verifyPassword', this.verifyPasswordFormControl);
    }

    trySubmit = async () => {
        return await this.resetPasswordService.resetPassword(this.token, {
            newPassword: this.newPasswordFormControl.value,
            verifyPassword: this.verifyPasswordFormControl.value
        });
    }
}
