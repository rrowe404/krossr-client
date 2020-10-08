import { NgModule } from '@angular/core';
import { LevelEditorComponent } from './LevelEditorComponent';
import { LevelEditorFormModule } from '../LevelEditorForm/LevelEditorFormModule';
import { GameModule } from '../Game/GameModule';
import { CommonModule } from '@angular/common';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';
import { AsyncModule } from '../Async/AsyncModule';

@NgModule({
    imports: [
        AsyncModule,
        CommonModule,
        GameModule,
        LoadingAnimationModule,
        LevelEditorFormModule
    ],
    declarations: [
        LevelEditorComponent
    ],
    entryComponents: [
        LevelEditorComponent
    ],
    exports: [
        LevelEditorComponent
    ]
})
export class LevelEditorModule {
}
