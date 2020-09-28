import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { SignInService } from './SignInService';
import { ForgotPasswordComponent } from '../ForgotPassword/ForgotPasswordComponent';
import { KrossrError } from '@krossr/types';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';
import { nowAndLater } from '../Debounce/Debounce';

/** Sign-in popup */
@Component({
    selector: 'krossr-sign-in',
    templateUrl: './SignInView.html'
})
export class SignInComponent extends KrossrDialogBase implements OnInit {
    public formGroup: FormGroup;
    public username: FormControl;
    public password: FormControl;
    public error: string;

    constructor(
        protected matDialogRef: MatDialogRef<SignInComponent>,
        private matDialog: MatDialog,
        private signInService: SignInService
    ) {
        super(matDialogRef);
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.username = new FormControl('');
        this.password = new FormControl('');
        this.formGroup.addControl('username', this.username);
        this.formGroup.addControl('password', this.password);
    }

    openForgotPassword() {
        this.close();
        this.matDialog.open(ForgotPasswordComponent, {
            data: {
                username: this.username.value
            }
        });
    }

    signIn() {
        return this.signInService.signIn(this.username.value, this.password.value).then(() => {
            this.close();
        }).catch((response: KrossrError) => {
            nowAndLater(() => this.error = response.error.message, () => this.error = '');
        });
    }

    signInButtonText() {
        return this.error || 'Sign In';
    }
}
