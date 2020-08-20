import { NgModule } from '@angular/core';
import { LevelEditorComponent } from './LevelEditorComponent';
import { LevelEditorFormModule } from '../LevelEditorForm/LevelEditorFormModule';
import { GameModule } from '../Game/GameModule';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        GameModule,
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