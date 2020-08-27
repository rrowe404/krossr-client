import { NgModule } from '@angular/core';
import { ConfirmationComponent } from './ConfirmationComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        KrossrButtonModule,
        MatDialogModule,
        PopupContentModule
    ],
    declarations: [
        ConfirmationComponent
    ],
    entryComponents: [
        ConfirmationComponent
    ],
    exports: [
        ConfirmationComponent
    ]
})
export class ConfirmationModule {
}
