import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelSelectFilterComponent } from './LevelSelectFilterComponent';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';
import { KrossrSelectModule } from '../KrossrSelect/KrossrSelectModule';

@NgModule({
    imports: [
        CommonModule,
        KrossrInputModule,
        KrossrSelectModule,
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
