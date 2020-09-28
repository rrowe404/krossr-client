import { Component, OnInit } from '@angular/core';
import { SignUpService } from './SignUpService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MinPasswordLength } from '../Password/MinPasswordLength';
import { KrossrError } from '@krossr/types';
import { nowAndLater } from '../Debounce/Debounce';
import { KrossrFormBase } from '../KrossrForm/KrossrFormBase';

@Component({
    selector: 'krossr-sign-up',
    templateUrl: './SignUpView.html'
})
export class SignUpComponent extends KrossrFormBase implements OnInit {
    defaultMessage = 'Sign Up';

    constructor(
        private matDialogRef: MatDialogRef<SignUpComponent>,
        private signUpService: SignUpService
    ) {
        super();
    }

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
            this.displayErrorMessage(response);
        });
    }
}
