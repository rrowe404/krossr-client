import { NgModule } from '@angular/core';
import { PopupContentModule } from 'src/PopupContent/PopupContentModule';
import { ResetPasswordAttemptedComponent } from './ResetPasswordAttemptedComponent';

@NgModule({
    imports: [
        PopupContentModule,
    ],
    declarations: [
        ResetPasswordAttemptedComponent
    ],
    entryComponents: [
        ResetPasswordAttemptedComponent
    ],
    exports: [
        ResetPasswordAttemptedComponent
    ]
})
export class ResetPasswordAttemptedModule {
}
