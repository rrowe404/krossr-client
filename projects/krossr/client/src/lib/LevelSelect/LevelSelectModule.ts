import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { LevelSelectComponent } from './LevelSelectComponent';
import { CommonModule } from '@angular/common';
import { LevelSelectFilterModule } from '../LevelSelectFilter/LevelSelectFilterModule';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';
import { PaginationModule } from '../Pagination/PaginationModule';
import { UIRouterModule } from '@uirouter/angular';

@NgModule({
    imports: [
        CommonModule,
        LevelSelectFilterModule,
        LoadingAnimationModule,
        PaginationModule,
        PopupContentModule,
        ReactiveFormsModule,
        UIRouterModule.forChild()
    ],
    declarations: [
        LevelSelectComponent
    ],
    entryComponents: [
        LevelSelectComponent
    ],
    exports: [
        LevelSelectComponent
    ]
})
export class LevelSelectModule {
}
