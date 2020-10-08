import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './UserService';
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

    trySubmit = async () => {
        await this.userService.updateUser(this.emailFormControl.value);
    }
}
