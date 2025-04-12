import { NgModule } from '@angular/core';
import { LevelEditorFormModule } from '../LevelEditorForm/LevelEditorFormModule';
import { LevelCreatorComponent } from './LevelCreatorComponent';
import { GameModule } from '../Game/GameModule';
import { CommonModule } from '@angular/common';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';
import { AsyncModule } from '../Async/AsyncModule';
import { KrossrInputModule } from 'src/KrossrInput/KrossrInputModule';

@NgModule({
    imports: [
        AsyncModule,
        CommonModule,
        GameModule,
        KrossrInputModule,
        LoadingAnimationModule,
        LevelEditorFormModule
    ],
    declarations: [
        LevelCreatorComponent
    ],
    entryComponents: [
        LevelCreatorComponent
    ],
    exports: [
        LevelCreatorComponent
    ]
})
export class LevelCreatorModule {
}
