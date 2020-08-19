import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './ChangePasswordComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        KrossrButtonModule,
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
