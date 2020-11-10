import { AuthenticationService } from '../Authentication/AuthenticationService';
import { Component } from '@angular/core';
import { HelpComponent } from '../Help/HelpComponent';
import { EditProfileComponent } from '../EditProfile/EditProfileComponent';
import { SignInComponent } from '../SignIn/SignInComponent';
import { SignUpComponent } from '../SignUp/SignUpComponent';
import { StateService } from '@uirouter/core';
import { LevelRoutes } from '../Routing/RouteNames';
import { KrossrDialogService } from 'src/KrossrDialog/KrossrDialogService';

@Component({
    selector: 'krossr-header',
    styleUrls: ['./HeaderStyles.less'],
    templateUrl: './HeaderView.html'
})
export class HeaderComponent {
    constructor(
        public Authentication: AuthenticationService,
        private dialogService: KrossrDialogService,
        private stateService: StateService
    ) {

    }

    openEditProfile() {
        this.dialogService.open(EditProfileComponent);
    }

    openHelp() {
        this.dialogService.open(HelpComponent);
    }

    openLevelSelect() {
        this.stateService.go(LevelRoutes.list);
    }

    openSignIn() {
        this.dialogService.open(SignInComponent);
    }

    openSignUp() {
        this.dialogService.open(SignUpComponent);
    }
}
