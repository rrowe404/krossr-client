import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './ResetPasswordComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';

@NgModule({
    imports: [
        KrossrButtonModule,
        KrossrInputModule,
        PopupContentModule,
        ReactiveFormsModule
    ],
    declarations: [
        ResetPasswordComponent
    ],
    entryComponents: [
        ResetPasswordComponent
    ],
    exports: [
        ResetPasswordComponent
    ]
})
export class ResetPasswordModule {
}
