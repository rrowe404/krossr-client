import { NgModule } from '@angular/core';
import { PopupContentModule } from '../PopupContent/PopupContentModule';
import { KrossrButtonModule } from '../KrossrButton/KrossrButtonModule';
import { HelpComponent } from './HelpComponent';

@NgModule({
    imports: [
        KrossrButtonModule,
        PopupContentModule
    ],
    declarations: [
        HelpComponent
    ],
    entryComponents: [
        HelpComponent
    ],
    exports: [
        HelpComponent
    ]
})
export class HelpModule {
}
