import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { CompleteLevelPreviewModule } from '../CompleteLevelPreview/CompleteLevelPreviewModule';

import { LevelSelectTileComponent } from './LevelSelectTileComponent';

@NgModule({
    imports: [
    CommonModule,
    CompleteLevelPreviewModule,
    UIRouterModule.forChild(),
    LevelSelectTileComponent
],
    exports: [
        LevelSelectTileComponent
    ]
})
export class LevelSelectTileModule {
}
