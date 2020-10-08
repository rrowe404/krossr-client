import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SignInService } from './SignInService';
import { ForgotPasswordComponent } from '../ForgotPassword/ForgotPasswordComponent';
import { KrossrFormDialogBase } from '../KrossrFormDialog/KrossrFormDialogBase';

/** Sign-in popup */
@Component({
    selector: 'krossr-sign-in',
    templateUrl: './SignInView.html'
})
export class SignInComponent extends KrossrFormDialogBase implements OnInit {
    defaultMessage = 'Sign In';

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

    trySubmit = async () => {
        await this.signInService.signIn(this.username.value, this.password.value);
    }

    onSuccess = () => Promise.resolve(this.close());
}
