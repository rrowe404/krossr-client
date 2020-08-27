import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';

@Component({
    selector: 'krossr-help',
    styleUrls: ['./HelpStyles.less'],
    templateUrl: './HelpView.html'
})
export class HelpComponent extends KrossrDialogBase {
    constructor(
        protected matDialogRef: MatDialogRef<HelpComponent>
    ) {
        super(matDialogRef);
    }
}
