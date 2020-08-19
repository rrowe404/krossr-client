import { NgModule } from '@angular/core';
import { PaginationComponent } from './PaginationComponent';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PaginationComponent
    ],
    entryComponents: [
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ]
})
export class PaginationModule {
}
