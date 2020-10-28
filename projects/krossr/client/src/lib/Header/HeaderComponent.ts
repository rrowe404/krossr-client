import { AuthenticationService } from '../Authentication/AuthenticationService';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HelpComponent } from '../Help/HelpComponent';
import { EditProfileComponent } from '../EditProfile/EditProfileComponent';
import { SignInComponent } from '../SignIn/SignInComponent';
import { SignUpComponent } from '../SignUp/SignUpComponent';
import { StateService } from '@uirouter/core';
import { LevelRoutes } from '../Routing/RouteNames';

@Component({
    selector: 'krossr-header',
    styleUrls: ['./HeaderStyles.less'],
    templateUrl: './HeaderView.html'
})
export class HeaderComponent {
    constructor(
        public Authentication: AuthenticationService,
        private matDialog: MatDialog,
        private stateService: StateService
    ) {

    }

    openEditProfile() {
        this.matDialog.open(EditProfileComponent);
    }

    openHelp() {
        this.matDialog.open(HelpComponent);
    }

    openLevelSelect() {
        this.stateService.go(LevelRoutes.list);
    }

    openSignIn() {
        this.matDialog.open(SignInComponent);
    }

    openSignUp() {
        this.matDialog.open(SignUpComponent);
    }
}
