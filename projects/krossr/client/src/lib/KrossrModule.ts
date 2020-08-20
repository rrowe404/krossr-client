import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingAnimationComponent } from './LoadingAnimation/LoadingAnimationComponent';
import { Routes } from './Routing/Routes';
import { ShellComponent } from './Shell/ShellComponent';
import { ResizeDirective } from './Resize/ResizeDirective';
import { GameResizeService } from './GameSize/GameResizeService';
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
import { LevelModule } from './Level/LevelModule';
import { HelpModule } from './Help/HelpModule';
import { HeaderModule } from './Header/HeaderModule';
import { ResetPasswordModule } from './ResetPassword/ResetPasswordModule';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ChangePasswordModule,
        CommonModule,
        ConfirmationModule,
        EditProfileModule,
        GameModule,
        HeaderModule,
        HelpModule,
        HttpClientModule,
        LevelModule,
        LevelSelectModule,
        MatDialogModule,
        ReactiveFormsModule,
        ResetPasswordModule,
        SignInModule,
        UIRouterModule.forRoot({ states: Routes.getNg2Routes(), config: uiRouterConfigFn }),
        UpdateUserModule
    ],
    declarations: [
        HomeComponent,
        LoadingAnimationComponent,
        NotFoundComponent,
        ResizeDirective,
        ShellComponent
    ],
    entryComponents: [
        HomeComponent,
        LoadingAnimationComponent,
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
        { provide: 'window', useValue: window }
    ]
})
export class KrossrModule {
    constructor(
        private gameResizeService: GameResizeService,
        private userService: UserService
    ) {
        this.gameResizeService.initialize();
        this.userService.getLoggedInUser();
    }
}
