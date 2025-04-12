import { NgModule } from '@angular/core';
import { GameModule } from '../Game/GameModule';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './LevelComponent';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    imports: [
    BrowserAnimationsModule,
    CommonModule,
    GameModule,
    LevelComponent
],
    exports: [
        LevelComponent
    ]
})
export class LevelModule {
}
