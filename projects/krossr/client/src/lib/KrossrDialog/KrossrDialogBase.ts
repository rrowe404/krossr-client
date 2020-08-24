import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
    template: ''
})
// tslint:disable-next-line
export abstract class KrossrDialogBase {
    constructor(
        protected matDialogRef: MatDialogRef<KrossrDialogBase>
    ) {
    }

    close() {
        this.matDialogRef.close();
    }
}
