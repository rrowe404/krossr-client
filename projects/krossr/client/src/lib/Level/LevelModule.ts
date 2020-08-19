import { NgModule } from '@angular/core';
import { GameModule } from '../Game/GameModule';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './LevelComponent';
import { LevelEditorFormModule } from '../LevelEditorForm/LevelEditorFormModule';

@NgModule({
    imports: [
        CommonModule,
        GameModule,
        LevelEditorFormModule,
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
