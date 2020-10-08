import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupLoadingAnimationModule } from '../PopupLoadingAnimation/PopupLoadingAnimationModule';
import { PopupContentComponent } from './PopupContentComponent';

@NgModule({
    imports: [
        CommonModule,
        PopupLoadingAnimationModule
    ],
    declarations: [
        PopupContentComponent
    ],
    entryComponents: [
        PopupContentComponent
    ],
    exports: [
        PopupContentComponent
    ]
})
export class PopupContentModule {
}
