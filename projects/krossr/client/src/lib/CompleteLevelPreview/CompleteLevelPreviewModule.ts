import { NgModule } from '@angular/core';
import { GameModule } from '../Game/GameModule';
import { CompleteLevelPreviewComponent } from './CompleteLevelPreviewComponent';

@NgModule({
    imports: [
        GameModule
    ],
    declarations: [ CompleteLevelPreviewComponent ],
    entryComponents: [ CompleteLevelPreviewComponent ],
    exports: [ CompleteLevelPreviewComponent ]
})
export class CompleteLevelPreviewModule {
}
