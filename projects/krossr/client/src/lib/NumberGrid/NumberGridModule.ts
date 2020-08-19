import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberLineModule } from '../NumberLine/NumberLineModule';
import { NumberGridComponent } from './NumberGridComponent';

@NgModule({
    imports: [
        CommonModule,
        NumberLineModule
    ],
    declarations: [
        NumberGridComponent
    ],
    entryComponents: [
        NumberGridComponent
    ],
    exports: [
        NumberGridComponent
    ]
})
export class NumberGridModule {
}
