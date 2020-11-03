import { NgModule } from '@angular/core';
import { EditProfileComponent } from './EditProfileComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateUserModule } from '../User/UpdateUserModule';
import { ChangePasswordModule } from '../ChangePassword/ChangePasswordModule';

@NgModule({
    imports: [
        ChangePasswordModule,
        KrossrButtonModule,
        MatDialogModule,
        PopupContentModule,
        UpdateUserModule
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
