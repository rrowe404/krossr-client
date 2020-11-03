import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './EditProfileComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { EditProfileModule } from './EditProfileModule';
import { SignOutService } from '../SignOut/SignOutService';

describe('EditProfileComponent', () => {
    let fixture: ComponentFixture<EditProfileComponent>;
    let component: EditProfileComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                EditProfileModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(EditProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should sign out and close', async () => {
        let signOutService: SignOutService = TestBed.inject(SignOutService);
        spyOn(signOutService, 'signout').and.returnValue(Promise.resolve());
        spyOn(component, 'close');

        await component.signout();
        expect(signOutService.signout).toHaveBeenCalled();
        expect(component.close).toHaveBeenCalled();
    });
});
