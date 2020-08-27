import { NgModule } from '@angular/core';
import { UpdateUserComponent } from './UpdateUserComponent';
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
