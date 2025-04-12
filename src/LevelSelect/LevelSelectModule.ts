import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LevelSelectComponent } from './LevelSelectComponent';
import { CommonModule } from '@angular/common';


import { UIRouterModule } from '@uirouter/angular';
import { LevelSelectTileModule } from '../LevelSelectTile/LevelSelectTileModule';


@NgModule({
    imports: [
    CommonModule,
    LevelSelectTileModule,
    ReactiveFormsModule,
    UIRouterModule.forChild(),
    LevelSelectComponent
],
    exports: [
        LevelSelectComponent
    ]
})
export class LevelSelectModule {
}
