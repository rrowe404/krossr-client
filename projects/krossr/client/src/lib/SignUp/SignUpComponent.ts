import { Component, OnInit } from '@angular/core';
import { SignUpService } from './SignUpService';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MinPasswordLength } from '../Password/MinPasswordLength';
import { KrossrFormDialogBase } from '../KrossrFormDialog/KrossrFormDialogBase';

@Component({
    selector: 'krossr-sign-up',
    templateUrl: './SignUpView.html'
})
export class SignUpComponent extends KrossrFormDialogBase implements OnInit {
    defaultMessage = 'Sign Up';

    constructor(
        matDialogRef: MatDialogRef<SignUpComponent>,
        private signUpService: SignUpService
    ) {
        super(matDialogRef);
    }

    public username: FormControl;
    public email: FormControl;
    public password: FormControl;

    ngOnInit() {
        this.username = new FormControl('', [Validators.required]);
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required, Validators.minLength(MinPasswordLength.value)]);
        this.formGroup.addControl('username', this.username);
        this.formGroup.addControl('email', this.email);
        this.formGroup.addControl('password', this.password);
    }

    trySubmit = async () => {
        await this.signUpService.signUp(this.username.value, this.email.value, this.password.value);
    }

    onSuccess = () => Promise.resolve(this.close());
}
