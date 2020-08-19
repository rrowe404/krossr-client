import { NgModule } from '@angular/core';
import { HeaderComponent } from './HeaderComponent';
import { SignUpModule } from '../SignUp/SignUpModule';

@NgModule({
    imports: [
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