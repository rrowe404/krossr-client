import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationComponent } from './ConfirmationComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationModule } from './ConfirmationModule';

describe('ConfirmationComponent', () => {
    let fixture: ComponentFixture<ConfirmationComponent>;
    let component: ConfirmationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ConfirmationModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                {
                    provide: MAT_DIALOG_DATA, useValue: {
                        submitAction: () => {}
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should confirm and close', () => {
        spyOn(component.data, 'submitAction');
        spyOn(component, 'close');

        component.confirm();

        expect(component.data.submitAction).toHaveBeenCalled();
        expect(component.close).toHaveBeenCalled();
    });
});
