import { NgModule } from '@angular/core';
import { ModeSelectorComponent } from './ModeSelectorComponent';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModeSelectorComponent
    ],
    entryComponents: [
        ModeSelectorComponent
    ],
    exports: [
        ModeSelectorComponent
    ]
})
export class ModeSelectorModule {
}
