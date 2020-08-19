import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateUserComponent } from './UpdateUserComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateUserModule } from './UpdateUserModule';

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
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
