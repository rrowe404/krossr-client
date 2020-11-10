import { NgModule } from '@angular/core';
import { ConfirmationComponent } from './ConfirmationComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { KrossrDialogModule } from 'src/KrossrDialog/KrossrDialogModule';

@NgModule({
    imports: [
        KrossrButtonModule,
        KrossrDialogModule,
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
