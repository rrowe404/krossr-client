import { NgModule } from '@angular/core';
import { LevelEditorFormComponent } from './LevelEditorFormComponent';
import { CommonModule } from '@angular/common';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';
import { KrossrSelectModule } from '../KrossrSelect/KrossrSelectModule';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';
import { AsyncModule } from '../Async/AsyncModule';

@NgModule({
    imports: [
        AsyncModule,
        CommonModule,
        LoadingAnimationModule,
        MatDialogModule,
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
