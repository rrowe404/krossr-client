import { MatDialogRef } from '@angular/material/dialog';
import { Directive } from '@angular/core';
import { KrossrFormBase } from '../KrossrForm/KrossrFormBase';

@Directive()
// tslint:disable-next-line
export abstract class KrossrFormDialogBase extends KrossrFormBase {
    constructor(
        protected matDialogRef: MatDialogRef<KrossrFormDialogBase>
    ) {
        super();
    }

    close() {
        if (this.matDialogRef) {
            this.matDialogRef.close();
        }
    }
}
