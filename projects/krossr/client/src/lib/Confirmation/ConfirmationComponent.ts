import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationOptions } from './ConfirmationOptions';

@Component({
    selector: 'krossr-confirmation',
    templateUrl: './ConfirmationView.html'
})
export class ConfirmationComponent {
    constructor(
        private matDialogRef: MatDialogRef<ConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmationOptions
    ) {
    }

    public submitText: string;

    public cancel() {
        this.matDialogRef.close();
    }

    public confirm() {
        this.data.submitAction();
        this.cancel();
    }
}
