import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { KrossrFormBase } from '../KrossrForm/KrossrFormBase';

@Component({
    template: ''
})
// tslint:disable-next-line
export abstract class KrossrFormDialogBase extends KrossrFormBase {
    constructor(
        protected matDialogRef: MatDialogRef<KrossrFormDialogBase>
    ) {
        super();
    }

    close() {
        this.matDialogRef.close();
    }
}
