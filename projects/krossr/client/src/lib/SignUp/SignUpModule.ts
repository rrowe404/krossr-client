import { NgModule } from '@angular/core';
import { SignUpComponent } from './SignUpComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        KrossrButtonModule,
        MatDialogModule,
        PopupContentModule,
        ReactiveFormsModule
    ],
    declarations: [
        SignUpComponent
    ],
    entryComponents: [
        SignUpComponent
    ],
    exports: [
        SignUpComponent
    ]
})
export class SignUpModule {
}
