import { NgModule } from '@angular/core';
import { GameModule } from '../Game/GameModule';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './LevelComponent';
import { NumberGridModule } from '../NumberGrid/NumberGridModule';
import { ModeSelectorModule } from '../ModeSelector/ModeSelectorModule';
import { StarRatingModule } from '../StarRating/StarRatingModule';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';
import { AsyncModule } from '../Async/AsyncModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KrossrDialogModule } from 'src/KrossrDialog/KrossrDialogModule';
import { LevelEditorFormModule } from 'src/LevelEditorForm/LevelEditorFormModule';

@NgModule({
    imports: [
        AsyncModule,
        BrowserAnimationsModule,
        CommonModule,
        GameModule,
        LoadingAnimationModule,
        LevelEditorFormModule,
        ModeSelectorModule,
        NumberGridModule,
        StarRatingModule,
        KrossrDialogModule
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
