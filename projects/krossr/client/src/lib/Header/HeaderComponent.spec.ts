import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './HeaderComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../EditProfile/EditProfileComponent';
import { HelpComponent } from '../Help/HelpComponent';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';
import { SignInComponent } from '../SignIn/SignInComponent';
import { SignUpComponent } from '../SignUp/SignUpComponent';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;
    let matDialog: MatDialog;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                HttpClientTestingModule
            ],
            declarations: [ HeaderComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        matDialog = TestBed.inject(MatDialog);
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
        expect(matDialog.open).toHaveBeenCalledWith(LevelSelectComponent);
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
