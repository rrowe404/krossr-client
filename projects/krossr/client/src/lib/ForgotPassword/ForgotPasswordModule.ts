import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './ForgotPasswordComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupContentModule } from '../PopupContent/PopupContentModule';

@NgModule({
    imports: [
        CommonModule,
        KrossrButtonModule,
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