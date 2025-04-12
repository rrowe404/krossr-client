import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';
import { PopupContentComponent } from '../PopupContent/PopupContentComponent';
import { KrossrButtonComponent } from '../KrossrButton/KrossrButtonComponent';

@Component({
    selector: 'krossr-help',
    styleUrls: ['./HelpStyles.less'],
    templateUrl: './HelpView.html',
    imports: [PopupContentComponent, KrossrButtonComponent]
})
export class HelpComponent extends KrossrDialogBase {
    constructor(
        protected matDialogRef: MatDialogRef<HelpComponent>
    ) {
        super(matDialogRef);
    }
}
