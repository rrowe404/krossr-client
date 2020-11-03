import { NgModule } from '@angular/core';
import { SignUpComponent } from './SignUpComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
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
