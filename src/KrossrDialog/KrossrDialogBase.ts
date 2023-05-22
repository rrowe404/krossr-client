import { MatDialogRef } from '@angular/material/dialog';
import { Directive } from '@angular/core';

@Directive()
// eslint-disable-next-line
export abstract class KrossrDialogBase {
    constructor(
        protected matDialogRef: MatDialogRef<KrossrDialogBase>
    ) {
    }

    close() {
        this.matDialogRef.close();
    }
}
