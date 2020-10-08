import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChangePasswordService } from './ChangePasswordService';
import { MinPasswordLength } from '../Password/MinPasswordLength';
import { KrossrFormBase } from '../KrossrForm/KrossrFormBase';

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
    successMessage = 'Password Saved!';
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

    trySubmit = async () => {
        await this.changePasswordService.changePassword(
            this.currentPasswordFormControl.value,
            this.newPasswordFormControl.value,
            this.verifyPasswordFormControl.value
        );
    }
}
