import { NgModule } from '@angular/core';
import { GameModule } from '../Game/GameModule';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './LevelComponent';
import { LevelEditorFormModule } from '../LevelEditorForm/LevelEditorFormModule';
import { NumberGridModule } from '../NumberGrid/NumberGridModule';
import { ModeSelectorModule } from '../ModeSelector/ModeSelectorModule';
import { StarRatingModule } from '../StarRating/StarRatingModule';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';

@NgModule({
    imports: [
        CommonModule,
        GameModule,
        LoadingAnimationModule,
        LevelEditorFormModule,
        ModeSelectorModule,
        NumberGridModule,
        StarRatingModule,
        MatDialogModule
    ],
    declarations: [
        LevelComponent
    ],
    entryComponents: [
        LevelComponent
    ],
    exports: [
        LevelComponent
    ]
})
export class LevelModule {
}
