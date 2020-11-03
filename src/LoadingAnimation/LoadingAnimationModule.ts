import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingAnimationComponent } from './LoadingAnimationComponent';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingAnimationComponent
    ],
    entryComponents: [
        LoadingAnimationComponent
    ],
    exports: [
        LoadingAnimationComponent
    ]
})
export class LoadingAnimationModule {
}
