import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './ResetPasswordComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        KrossrButtonModule,
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
