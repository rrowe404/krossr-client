import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './ForgotPasswordComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';

@NgModule({
    imports: [
        CommonModule,
        KrossrButtonModule,
        KrossrInputModule,
        MatDialogModule,
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
