import { NgModule } from '@angular/core';
import { LevelEditorFormComponent } from './LevelEditorFormComponent';
import { CommonModule } from '@angular/common';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';
import { KrossrSelectModule } from '../KrossrSelect/KrossrSelectModule';

@NgModule({
    imports: [
        CommonModule,
        KrossrButtonModule,
        KrossrInputModule,
        KrossrSelectModule,
        ReactiveFormsModule
    ],
    declarations: [
        LevelEditorFormComponent
    ],
    entryComponents: [
        LevelEditorFormComponent
    ],
    exports: [
        LevelEditorFormComponent
    ]
})
export class LevelEditorFormModule {
}
