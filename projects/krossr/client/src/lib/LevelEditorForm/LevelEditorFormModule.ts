import { NgModule } from '@angular/core';
import { LevelEditorFormComponent } from './LevelEditorFormComponent';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LevelEditorFormComponent
    ],
    entryComponents: [
        LevelEditorFormComponent
    ],
    exports: [
        LevelEditorFormComponent
    ]
})
export class LevelEditorFormModule {
}
