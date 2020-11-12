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
import { KrossrDialogService } from 'src/KrossrDialog/KrossrDialogService';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;
    let dialogService: KrossrDialogService;
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
        dialogService = TestBed.inject(KrossrDialogService);
        stateService = TestBed.inject(StateService);
        spyOn(stateService, 'go');
        spyOn(dialogService, 'open');
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should open the profile', () => {
        component.openEditProfile();
        expect(dialogService.open).toHaveBeenCalledWith(EditProfileComponent);
    });

    it('should open the help', () => {
        component.openHelp();
        expect(dialogService.open).toHaveBeenCalledWith(HelpComponent);
    });

    it('should open the level select', () => {
        component.openLevelSelect();

        expect(stateService.go).toHaveBeenCalledWith(LevelRoutes.list);
    });

    it('should open the sign up', () => {
        component.openSignUp();
        expect(dialogService.open).toHaveBeenCalledWith(SignUpComponent);
    });

    it('should open the sign in', () => {
        component.openSignIn();
        expect(dialogService.open).toHaveBeenCalledWith(SignInComponent);
    });
});
