import { NgModule } from '@angular/core';
import { TileComponent } from './TileComponent';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TileComponent
    ],
    entryComponents: [
        TileComponent
    ],
    exports: [
        TileComponent
    ]
})
export class TileModule {
}
