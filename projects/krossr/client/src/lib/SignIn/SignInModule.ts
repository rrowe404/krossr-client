import { NgModule } from '@angular/core';
import { ForgotPasswordModule } from '../ForgotPassword/ForgotPasswordModule';
import { SignInComponent } from './SignInComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ForgotPasswordModule,
        KrossrButtonModule,
        MatDialogModule,
        PopupContentModule,
        ReactiveFormsModule
    ],
    declarations: [
        SignInComponent
    ],
    entryComponents: [
        SignInComponent
    ],
    exports: [
        SignInComponent
    ]
})
export class SignInModule {
}
