import { NgModule } from '@angular/core';
import { EditProfileComponent } from './EditProfileComponent';
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
        EditProfileComponent
    ],
    entryComponents: [
        EditProfileComponent
    ],
    exports: [
        EditProfileComponent
    ]
})
export class EditProfileModule {
}
