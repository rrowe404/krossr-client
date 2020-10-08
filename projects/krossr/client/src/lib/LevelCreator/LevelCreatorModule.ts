import { NgModule } from '@angular/core';
import { LevelEditorFormModule } from '../LevelEditorForm/LevelEditorFormModule';
import { LevelCreatorComponent } from './LevelCreatorComponent';
import { GameModule } from '../Game/GameModule';
import { CommonModule } from '@angular/common';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';

@NgModule({
    imports: [
        CommonModule,
        GameModule,
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
