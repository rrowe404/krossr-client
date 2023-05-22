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
import { UserService } from './User/UserService';
import { NotFoundComponent } from './NotFound/NotFoundComponent';
import { EditProfileModule } from './EditProfile/EditProfileModule';
import { ConfirmationModule } from './Confirmation/ConfirmationModule';
import { GameModule } from './Game/GameModule';
import { SignInModule } from './SignIn/SignInModule';
import { ChangePasswordModule } from './ChangePassword/ChangePasswordModule';
import { UpdateUserModule } from './User/UpdateUserModule';
import { LevelSelectModule } from './LevelSelect/LevelSelectModule';
import { HelpModule } from './Help/HelpModule';
import { HeaderModule } from './Header/HeaderModule';
import { ResetPasswordModule } from './ResetPassword/ResetPasswordModule';
import { LevelCreatorModule } from './LevelCreator/LevelCreatorModule';
import { LevelEditorModule } from './LevelEditor/LevelEditorModule';
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
        ChangePasswordModule,
        CommonModule,
        ConfirmationModule,
        EditProfileModule,
        GameModule,
        HeaderModule,
        HelpModule,
        HttpClientModule,
        LoadingAnimationModule,
        LevelCreatorModule,
        LevelEditorModule,
        LevelModule,
        LevelSelectModule,
        KrossrDialogModule,
        ReactiveFormsModule,
        ResetPasswordModule,
        SignInModule,
        UIRouterModule.forRoot({ states: Routes.getNg2Routes(), config: uiRouterConfigFn }),
        UpdateUserModule
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
    constructor(
        private userService: UserService
    ) {
        this.userService.getLoggedInUser();
    }
}
