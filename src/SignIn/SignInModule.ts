import { NgModule } from '@angular/core';
import { ForgotPasswordModule } from '../ForgotPassword/ForgotPasswordModule';
import { SignInComponent } from './SignInComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';

@NgModule({
    imports: [
        ForgotPasswordModule,
        KrossrButtonModule,
        KrossrInputModule,
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
