import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelSelectFilterComponent } from './LevelSelectFilterComponent';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';

@NgModule({
    imports: [
        CommonModule,
        KrossrInputModule,
        ReactiveFormsModule
    ],
    declarations: [
        LevelSelectFilterComponent
    ],
    entryComponents: [
        LevelSelectFilterComponent
    ],
    exports: [
        LevelSelectFilterComponent
    ]
})
export class LevelSelectFilterModule {
}
