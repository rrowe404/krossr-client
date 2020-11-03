import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationOptions } from './ConfirmationOptions';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';

@Component({
    selector: 'krossr-confirmation',
    templateUrl: './ConfirmationView.html'
})
export class ConfirmationComponent extends KrossrDialogBase {
    constructor(
        protected matDialogRef: MatDialogRef<ConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmationOptions
    ) {
        super(matDialogRef);
    }

    public submitText: string;

    public confirm() {
        this.data.submitAction();
        this.close();
    }
}
