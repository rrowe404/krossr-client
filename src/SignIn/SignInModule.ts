import { NgModule } from '@angular/core';
import { ForgotPasswordModule } from '../ForgotPassword/ForgotPasswordModule';
import { SignInComponent } from './SignInComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';
import { KrossrDialogModule } from 'src/KrossrDialog/KrossrDialogModule';

@NgModule({
    imports: [
        ForgotPasswordModule,
        KrossrButtonModule,
        KrossrInputModule,
        KrossrDialogModule,
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
