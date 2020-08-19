import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { GameOverComponent } from './GameOver/GameOverComponent';
import { NumberLineComponent } from './NumberLine/NumberLineComponent';
import { NumberGridComponent } from './NumberGrid/NumberGridComponent';
import { StarRatingComponent } from './StarRating/StarRatingComponent';
import { ModeSelectorComponent } from './ModeSelector/ModeSelectorComponent';
import { TileComponent } from './Tile/TileComponent';
import { LevelSelectComponent } from './LevelSelect/LevelSelectComponent';
import { HeaderComponent } from './Header/HeaderComponent';
import { PaginationComponent } from './Pagination/PaginationComponent';
import { LoadingAnimationComponent } from './LoadingAnimation/LoadingAnimationComponent';
import { HelpComponent } from './Help/HelpComponent';
import { ResetPasswordComponent } from './ResetPassword/ResetPasswordComponent';
import { SignUpComponent } from './SignUp/SignUpComponent';
import { Routes } from './Routing/Routes';
import { ChangePasswordComponent } from './ChangePassword/ChangePasswordComponent';
import { UpdateUserComponent } from './User/UpdateUserComponent';
import { LevelComponent } from './Level/LevelComponent';
import { ShellComponent } from './Shell/ShellComponent';
import { ResizeDirective } from './Resize/ResizeDirective';
import { GameResizeService } from './GameSize/GameResizeService';
import { HomeComponent } from './Home/HomeComponent';
import { LevelEditorFormComponent } from './LevelEditorForm/LevelEditorFormComponent';
import { uiRouterConfigFn } from './Config/RouterConfig';
import { UIRouterModule } from '@uirouter/angular';
import { LevelSelectFilterComponent } from './LevelSelectFilter/LevelSelectFilterComponent';
import { CommonModule } from '@angular/common';
import { UserService } from './User/UserService';
import { NotFoundComponent } from './NotFound/NotFoundComponent';
import { EditProfileModule } from './EditProfile/EditProfileModule';
import { ConfirmationModule } from './Confirmation/ConfirmationModule';
import { GameModule } from './Game/GameModule';
import { SignInModule } from './SignIn/SignInModule';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        ConfirmationModule,
        EditProfileModule,
        GameModule,
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        SignInModule,
        UIRouterModule.forRoot({ states: Routes.getNg2Routes(), config: uiRouterConfigFn })
    ],
    declarations: [
        ChangePasswordComponent,
        GameOverComponent,
        HomeComponent,
        LevelComponent,
        HeaderComponent,
        HelpComponent,
        LoadingAnimationComponent,
        LevelEditorFormComponent,
        LevelSelectComponent,
        LevelSelectFilterComponent,
        ModeSelectorComponent,
        NumberGridComponent,
        NumberLineComponent,
        NotFoundComponent,
        PaginationComponent,
        ResetPasswordComponent,
        ResizeDirective,
        ShellComponent,
        SignUpComponent,
        StarRatingComponent,
        TileComponent,
        UpdateUserComponent,
    ],
    entryComponents: [
        ChangePasswordComponent,
        GameOverComponent,
        HomeComponent,
        LevelComponent,
        HeaderComponent,
        HelpComponent,
        LoadingAnimationComponent,
        LevelEditorFormComponent,
        LevelSelectComponent,
        LevelSelectFilterComponent,
        ModeSelectorComponent,
        NumberGridComponent,
        NumberLineComponent,
        NotFoundComponent,
        PaginationComponent,
        ResetPasswordComponent,
        ShellComponent,
        SignUpComponent,
        StarRatingComponent,
        TileComponent,
        UpdateUserComponent
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
