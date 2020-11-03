import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelSelectFilterComponent } from './LevelSelectFilterComponent';
import { ReactiveFormsModule } from '@angular/forms';
import { KrossrInputModule } from '../KrossrInput/KrossrInputModule';
import { KrossrSelectModule } from '../KrossrSelect/KrossrSelectModule';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';
import { AsyncModule } from '../Async/AsyncModule';

@NgModule({
    imports: [
        AsyncModule,
        CommonModule,
        LoadingAnimationModule,
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
