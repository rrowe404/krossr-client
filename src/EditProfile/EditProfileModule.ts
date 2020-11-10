import { NgModule } from '@angular/core';
import { EditProfileComponent } from './EditProfileComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { UpdateUserModule } from '../User/UpdateUserModule';
import { ChangePasswordModule } from '../ChangePassword/ChangePasswordModule';
import { KrossrDialogModule } from 'src/KrossrDialog/KrossrDialogModule';

@NgModule({
    imports: [
        ChangePasswordModule,
        KrossrButtonModule,
        KrossrDialogModule,
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
