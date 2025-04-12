import { NgModule } from '@angular/core';

import { LevelCreatorComponent } from './LevelCreatorComponent';
import { GameModule } from '../Game/GameModule';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [
    CommonModule,
    GameModule,
    LevelCreatorComponent
],
    exports: [
        LevelCreatorComponent
    ]
})
export class LevelCreatorModule {
}
