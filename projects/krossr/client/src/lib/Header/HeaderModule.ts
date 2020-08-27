import { NgModule } from '@angular/core';
import { HeaderComponent } from './HeaderComponent';
import { SignUpModule } from '../SignUp/SignUpModule';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        SignUpModule
    ],
    declarations: [
        HeaderComponent
    ],
    entryComponents: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {
}
