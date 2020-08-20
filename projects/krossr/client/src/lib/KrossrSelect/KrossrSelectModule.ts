import { NgModule } from '@angular/core';
import { KrossrSelectComponent } from './KrossrSelectComponent';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        KrossrSelectComponent
    ],
    entryComponents: [
        KrossrSelectComponent
    ],
    exports: [
        KrossrSelectComponent
    ]
})
export class KrossrSelectModule {
}
