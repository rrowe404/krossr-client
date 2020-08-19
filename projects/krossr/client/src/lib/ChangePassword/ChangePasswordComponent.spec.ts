import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './ChangePasswordComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangePasswordModule } from './ChangePasswordModule';

describe('ChangePasswordComponent', () => {
    let fixture: ComponentFixture<ChangePasswordComponent>;
    let component: ChangePasswordComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ChangePasswordModule,
                HttpClientTestingModule
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ChangePasswordComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
