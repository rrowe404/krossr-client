import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule, Configuration, ConfigurationParameters } from '@krossr/api';
import { environment } from './environments/environment';
import { Routes } from './Routing/Routes';
import { ShellComponent } from './Shell/ShellComponent';
import { ResizeDirective } from './Resize/ResizeDirective';
import { HomeComponent } from './Home/HomeComponent';
import { uiRouterConfigFn } from './Config/RouterConfig';
import { UIRouterModule } from '@uirouter/angular';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './NotFound/NotFoundComponent';
import { ConfirmationModule } from './Confirmation/ConfirmationModule';
import { GameModule } from './Game/GameModule';
import { LevelSelectModule } from './LevelSelect/LevelSelectModule';
import { HelpModule } from './Help/HelpModule';
import { HeaderModule } from './Header/HeaderModule';
import { LevelCreatorModule } from './LevelCreator/LevelCreatorModule';
import { LoadingAnimationModule } from './LoadingAnimation/LoadingAnimationModule';
import { WINDOW_PROVIDERS } from './Window/WindowService';
import { KrossrDialogModule } from './KrossrDialog/KrossrDialogModule';
import { LevelModule } from './Level/LevelModule';

function apiConfigFactory(): Configuration {
    const params: ConfigurationParameters = {
        basePath: environment.apiBasePath
    };

    return new Configuration(params);
}

@NgModule({
    imports: [
        ApiModule.forRoot(apiConfigFactory),
        BrowserAnimationsModule,
        CommonModule,
        ConfirmationModule,
        GameModule,
        HeaderModule,
        HelpModule,
        HttpClientModule,
        LoadingAnimationModule,
        LevelCreatorModule,
        LevelModule,
        LevelSelectModule,
        KrossrDialogModule,
        ReactiveFormsModule,
        UIRouterModule.forRoot({ states: Routes.getNg2Routes(), config: uiRouterConfigFn })
    ],
    declarations: [
        HomeComponent,
        NotFoundComponent,
        ResizeDirective,
        ShellComponent
    ],
    entryComponents: [
        HomeComponent,
        NotFoundComponent,
        ShellComponent
    ],
    bootstrap: [
        ShellComponent
    ],
    exports: [
        ShellComponent
    ],
    providers: [
        WINDOW_PROVIDERS
    ]
})
export class KrossrModule {
}
