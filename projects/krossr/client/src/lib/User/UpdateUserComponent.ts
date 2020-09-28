import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './UserService';
import { KrossrError } from '@krossr/types';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { nowAndLater } from '../Debounce/Debounce';

@Component({
    selector: 'krossr-update-user',
    templateUrl: './UpdateUserView.html'
})
export class UpdateUserComponent implements OnInit{
    public success: boolean;
    public error: string;

    public formGroup: FormGroup;
    public emailFormControl: FormControl;

    constructor(
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
        this.formGroup.addControl('email', this.emailFormControl);
    }

    updateUser() {
        this.success = this.error = null;

        return this.userService.updateUser(this.emailFormControl.value).then(() => {
            nowAndLater(() => this.success = true, () => this.success = false);
        }).catch((response: KrossrError) => {
            nowAndLater(() => this.error = response.error.message, () => this.error = '');
        });
    }

    updateUserButtonText() {
        if (this.success) {
            return 'Email Saved';
        }

        return this.error || 'Save Email Address';
    }
}
