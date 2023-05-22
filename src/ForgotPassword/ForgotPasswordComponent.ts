/** Popup to change email/password or log out */

import { Input, Component, Inject, Optional, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForgotPasswordService } from './ForgotPasswordService';
import { KrossrFormDialogBase } from '../KrossrFormDialog/KrossrFormDialogBase';
import { ForgotPasswordDialogData } from './ForgotPasswordDialogData';
import { StateService } from '@uirouter/core';
import { UserRoutes } from 'src/Routing/RouteNames';

@Component({
    selector: 'krossr-forgot-password',
    templateUrl: './ForgotPasswordView.html'
})
export class ForgotPasswordComponent extends KrossrFormDialogBase implements OnInit {
    @Input() public invalid = false;

    defaultMessage = 'Submit';

    public username: string;
    public usernameFormControl: FormControl;

    constructor(
        @Optional() matDialogRef: MatDialogRef<ForgotPasswordComponent>,
        private forgotPasswordService: ForgotPasswordService,
        private state: StateService,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ForgotPasswordDialogData
    ) {
        super(matDialogRef);
    }

    ngOnInit() {
        this.usernameFormControl = new FormControl(this.data ? this.data.username : '', [Validators.required]);
        this.formGroup.addControl('username', this.usernameFormControl);
    }

    trySubmit = async () => {
        await this.forgotPasswordService.sendForgotPasswordRequest(this.usernameFormControl.value);
        this.close();
        this.state.go(UserRoutes.resetAttempted);
    }
}
