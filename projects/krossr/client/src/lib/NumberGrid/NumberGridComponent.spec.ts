import { NumberGridComponent } from './NumberGridComponent';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { NumberGridModule } from './NumberGridModule';

describe('NumberGridComponent', () => {
    let fixture: ComponentFixture<NumberGridComponent>;
    let component: NumberGridComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NumberGridModule
            ]
        });

        fixture = TestBed.createComponent(NumberGridComponent);
        component = fixture.componentInstance;
        component.goalMatrix = new BooleanMatrix(2, 2);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
