import { NgModule } from '@angular/core';
import { StarRatingComponent } from './StarRatingComponent';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        StarRatingComponent
    ],
    entryComponents: [
        StarRatingComponent
    ],
    exports: [
        StarRatingComponent
    ]
})
export class StarRatingModule {
}