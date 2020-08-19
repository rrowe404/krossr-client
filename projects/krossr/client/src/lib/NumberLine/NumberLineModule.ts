import { NgModule } from '@angular/core';
import { NumberLineComponent } from './NumberLineComponent';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NumberLineComponent
    ],
    entryComponents: [
        NumberLineComponent
    ],
    exports: [
        NumberLineComponent
    ]
})
export class NumberLineModule {
}