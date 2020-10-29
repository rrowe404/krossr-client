import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { UncompleteLevelPreviewModule } from '../UncompleteLevelPreview/UncompleteLevelPreviewModule';
import { LevelSelectTileComponent } from './LevelSelectTileComponent';

@NgModule({
    imports: [
        CommonModule,
        UncompleteLevelPreviewModule,
        UIRouterModule.forChild()
    ],
    declarations: [
        LevelSelectTileComponent
    ],
    entryComponents: [
        LevelSelectTileComponent
    ],
    exports: [
        LevelSelectTileComponent
    ]
})
export class LevelSelectTileModule {
}
