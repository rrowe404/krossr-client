import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';
import { Routes } from './Routing/Routes';
import { ShellComponent } from './Shell/ShellComponent';
import { ResizeDirective } from './Resize/ResizeDirective';
import { HomeComponent } from './Home/HomeComponent';
import { uiRouterConfigFn } from './Config/RouterConfig';
import { UIRouterModule } from '@uirouter/angular';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './NotFound/NotFoundComponent';

import { GameModule } from './Game/GameModule';
import { LevelSelectModule } from './LevelSelect/LevelSelectModule';

import { LevelCreatorModule } from './LevelCreator/LevelCreatorModule';
import { WINDOW_PROVIDERS } from './Window/WindowService';

import { LevelModule } from './Level/LevelModule';
import { HeaderModule } from './Header/HeaderModule';

@NgModule({
    declarations: [ShellComponent],
    bootstrap: [ShellComponent],
    exports: [ShellComponent],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        GameModule,
        HeaderModule,
        LevelCreatorModule,
        LevelModule,
        LevelSelectModule,
        ReactiveFormsModule,
        UIRouterModule.forRoot({
            states: Routes.getNg2Routes(),
            config: uiRouterConfigFn,
        }),
        HomeComponent,
        NotFoundComponent,
        ResizeDirective,
    ],
    providers: [WINDOW_PROVIDERS, provideHttpClient(withInterceptorsFromDi())],
})
export class KrossrModule {}
