import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'help',
    styleUrls: ['./HelpStyles.less'],
    templateUrl: './HelpView.html'
})
export class HelpComponent {
    constructor(private matDialogRef: MatDialogRef<HelpComponent>) {
    }

    close() {
        this.matDialogRef.close();
    }
}
