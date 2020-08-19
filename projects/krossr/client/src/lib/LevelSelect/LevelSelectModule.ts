import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { LevelSelectComponent } from './LevelSelectComponent';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LevelSelectFilterModule } from '../LevelSelectFilter/LevelSelectFilterModule';

@NgModule({
    imports: [
        CommonModule,
        LevelSelectFilterModule,
        MatDialogModule,
        PopupContentModule,
        ReactiveFormsModule
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
