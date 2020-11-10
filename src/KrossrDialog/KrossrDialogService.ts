import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KrossrDialogConfig } from './KrossrDialogConfig';
import { KrossrDialogRef } from './KrossrDialogRef';

@Injectable({
    providedIn: 'root'
})
export class KrossrDialogService {
    constructor(
        private matDialog: MatDialog
    ) {
    }

    open<TComponent>(component: ComponentType<TComponent>, options?: KrossrDialogConfig) {
        return this.matDialog.open(component, options) as KrossrDialogRef<TComponent>;
    }
}
