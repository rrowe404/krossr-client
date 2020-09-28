import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './UserService';
import { KrossrError } from '@krossr/types';
import { KrossrFormBase } from '../KrossrForm/KrossrFormBase';

@Component({
    selector: 'krossr-update-user',
    templateUrl: './UpdateUserView.html'
})
export class UpdateUserComponent extends KrossrFormBase implements OnInit {
    public formGroup: FormGroup;
    public emailFormControl: FormControl;

    defaultMessage = 'Save Email Address';
    successMessage = 'Email Saved!';

    constructor(
        private userService: UserService
    ) {
        super();
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
        this.formGroup.addControl('email', this.emailFormControl);
    }

    updateUser() {
        this.success = this.error = null;

        return this.userService.updateUser(this.emailFormControl.value).then(() => {
            this.displaySuccessMessage();
        }).catch((response: KrossrError) => {
            this.displayErrorMessage(response);
        });
    }
}
