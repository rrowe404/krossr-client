import { NgModule } from '@angular/core';
import { KrossrInputComponent } from './KrossrInputComponent';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        KrossrInputComponent
    ],
    entryComponents: [
        KrossrInputComponent
    ],
    exports: [
        KrossrInputComponent
    ]
})
export class KrossrInputModule {
}
