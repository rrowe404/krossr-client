import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './ChangePasswordComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';

@NgModule({
    imports: [
        KrossrButtonModule,
        KrossrInputModule,
        ReactiveFormsModule
    ],
    declarations: [
        ChangePasswordComponent
    ],
    entryComponents: [
        ChangePasswordComponent
    ],
    exports: [
        ChangePasswordComponent
    ]
})
export class ChangePasswordModule {
}
