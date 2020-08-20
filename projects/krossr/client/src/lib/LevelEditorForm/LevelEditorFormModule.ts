import { NgModule } from '@angular/core';
import { LevelEditorFormComponent } from './LevelEditorFormComponent';
import { CommonModule } from '@angular/common';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';

@NgModule({
    imports: [
        CommonModule,
        KrossrButtonModule,
        KrossrInputModule,
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
