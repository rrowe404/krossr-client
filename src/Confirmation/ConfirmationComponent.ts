import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationOptions } from './ConfirmationOptions';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';
import { PopupContentComponent } from '../PopupContent/PopupContentComponent';
import { KrossrButtonComponent } from '../KrossrButton/KrossrButtonComponent';

@Component({
    selector: 'krossr-confirmation',
    templateUrl: './ConfirmationView.html',
    imports: [PopupContentComponent, KrossrButtonComponent]
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
