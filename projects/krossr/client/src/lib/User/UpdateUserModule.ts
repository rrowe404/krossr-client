import { NgModule } from '@angular/core';
import { UpdateUserComponent } from './UpdateUserComponent';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        KrossrButtonModule,
        ReactiveFormsModule
    ],
    declarations: [
        UpdateUserComponent
    ],
    entryComponents: [
        UpdateUserComponent
    ],
    exports: [
        UpdateUserComponent
    ]
})
export class UpdateUserModule {
}