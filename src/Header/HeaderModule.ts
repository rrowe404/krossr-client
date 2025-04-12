import { NgModule } from '@angular/core';
import { HeaderComponent } from './HeaderComponent';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {
}
