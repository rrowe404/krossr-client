import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateUserComponent } from './UpdateUserComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateUserModule } from './UpdateUserModule';
import { UserService } from './UserService';

describe('UpdateUserComponent', () => {
    let fixture: ComponentFixture<UpdateUserComponent>;
    let component: UpdateUserComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                UpdateUserModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UpdateUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should update user', () => {
        let userService: UserService = TestBed.inject(UserService);
        spyOn(userService, 'updateUser').and.returnValue(Promise.resolve());

        component.emailFormControl.setValue('test@test.com');

        return component.submit().then(() => {
            expect(component.success).toBeTruthy();
        });
    });

    it('should handle error', () => {
        let userService: UserService = TestBed.inject(UserService);

        spyOn(userService, 'updateUser').and.returnValue(Promise.reject({
            error: {
                message: 'no'
            }
        }));

        return component.submit().then(() => {
            expect(component.error).toBe('no');
            expect(component.buttonText()).toBe('no');
        });
    });
});
