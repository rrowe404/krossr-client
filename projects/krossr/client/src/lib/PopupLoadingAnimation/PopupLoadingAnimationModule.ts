import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';
import { PopupLoadingAnimationComponent } from './PopupLoadingAnimationComponent';

@NgModule({
    imports: [
        CommonModule,
        LoadingAnimationModule
    ],
    declarations: [
        PopupLoadingAnimationComponent
    ],
    entryComponents: [
        PopupLoadingAnimationComponent
    ],
    exports: [
        PopupLoadingAnimationComponent
    ]
})
export class PopupLoadingAnimationModule {
}
