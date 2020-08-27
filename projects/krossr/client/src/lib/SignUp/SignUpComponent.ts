import { Component, OnInit } from '@angular/core';
import { SignUpService } from './SignUpService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MinPasswordLength } from '../Password/MinPasswordLength';
import { KrossrError } from '@krossr/types';

@Component({
    selector: 'krossr-sign-up',
    templateUrl: './SignUpView.html'
})
export class SignUpComponent implements OnInit {
    public error: string;
    private timeout = 1000;

    constructor(
        private matDialogRef: MatDialogRef<SignUpComponent>,
        private signUpService: SignUpService
    ) {}

    public formGroup: FormGroup;
    public username: FormControl;
    public email: FormControl;
    public password: FormControl;

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.username = new FormControl('', [Validators.required]);
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required, Validators.minLength(MinPasswordLength.value)]);
        this.formGroup.addControl('username', this.username);
        this.formGroup.addControl('email', this.email);
        this.formGroup.addControl('password', this.password);
    }

    signUp() {
        this.signUpService.signUp(this.username.value, this.email.value, this.password.value).then(() => {
            this.matDialogRef.close();
        }).catch((response: KrossrError) => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        });
    }

    signUpButtonText() {
        return this.error || 'Sign Up';
    }
}
