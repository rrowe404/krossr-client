import { NgModule } from '@angular/core';
import { GameModule } from '../Game/GameModule';
import { CompleteLevelPreviewComponent } from './CompleteLevelPreviewComponent';

@NgModule({
    imports: [
        GameModule,
        CompleteLevelPreviewComponent
    ],
    exports: [CompleteLevelPreviewComponent]
})
export class CompleteLevelPreviewModule {
}
