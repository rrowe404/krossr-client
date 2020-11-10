import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './ForgotPasswordComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';
import { KrossrDialogModule } from 'src/KrossrDialog/KrossrDialogModule';

@NgModule({
    imports: [
        CommonModule,
        KrossrButtonModule,
        KrossrInputModule,
        KrossrDialogModule,
        PopupContentModule,
        ReactiveFormsModule
    ],
    declarations: [
        ForgotPasswordComponent
    ],
    entryComponents: [
        ForgotPasswordComponent
    ],
    exports: [
        ForgotPasswordComponent
    ]
})
export class ForgotPasswordModule {

}
