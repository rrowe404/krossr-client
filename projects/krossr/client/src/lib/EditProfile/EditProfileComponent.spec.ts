import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './EditProfileComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('EditProfileComponent', () => {
    let fixture: ComponentFixture<EditProfileComponent>;
    let component: EditProfileComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                HttpClientTestingModule
            ],
            declarations: [ EditProfileComponent ],
            providers: [
                { provide: MatDialogRef, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(EditProfileComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
