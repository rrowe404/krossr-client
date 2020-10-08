import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingAnimationModule } from '../LoadingAnimation/LoadingAnimationModule';
import { AsyncContentComponent } from './AsyncContentComponent';

@NgModule({
    imports: [
        CommonModule,
        LoadingAnimationModule
    ],
    declarations: [
        AsyncContentComponent
    ],
    entryComponents: [
        AsyncContentComponent
    ],
    exports: [
        AsyncContentComponent
    ]
})
export class AsyncModule {
}
