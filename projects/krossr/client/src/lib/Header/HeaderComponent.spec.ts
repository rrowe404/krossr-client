import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './HeaderComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                HttpClientTestingModule
            ],
            declarations: [ HeaderComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
