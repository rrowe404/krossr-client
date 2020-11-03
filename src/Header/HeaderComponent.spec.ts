import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './HeaderComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../EditProfile/EditProfileComponent';
import { HelpComponent } from '../Help/HelpComponent';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';
import { SignInComponent } from '../SignIn/SignInComponent';
import { SignUpComponent } from '../SignUp/SignUpComponent';
import { HeaderModule } from './HeaderModule';
import { StateService } from '@uirouter/core';
import { MockStateService } from 'src/test/MockStateService';
import { LevelRoutes } from '../Routing/RouteNames';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;
    let matDialog: MatDialog;
    let stateService: StateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                HttpClientTestingModule,
                HeaderModule
            ],
            providers: [
                { provide: StateService, useClass: MockStateService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        matDialog = TestBed.inject(MatDialog);
        stateService = TestBed.inject(StateService);
        spyOn(stateService, 'go');
        spyOn(matDialog, 'open');
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should open the profile', () => {
        component.openEditProfile();
        expect(matDialog.open).toHaveBeenCalledWith(EditProfileComponent);
    });

    it('should open the help', () => {
        component.openHelp();
        expect(matDialog.open).toHaveBeenCalledWith(HelpComponent);
    });

    it('should open the level select', () => {
        component.openLevelSelect();

        expect(stateService.go).toHaveBeenCalledWith(LevelRoutes.list);
    });

    it('should open the sign up', () => {
        component.openSignUp();
        expect(matDialog.open).toHaveBeenCalledWith(SignUpComponent);
    });

    it('should open the sign in', () => {
        component.openSignIn();
        expect(matDialog.open).toHaveBeenCalledWith(SignInComponent);
    });
});
