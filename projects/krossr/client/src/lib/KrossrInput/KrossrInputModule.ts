import { NgModule } from '@angular/core';
import { KrossrInputComponent } from './KrossrInputComponent';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
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
