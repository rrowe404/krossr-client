import { NumberLineComponent } from './NumberLineComponent';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

describe('NumberLineComponent', () => {
    let component: ComponentFixture<NumberLineComponent>;
    let instance: NumberLineComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule
            ],
            declarations: [
                NumberLineComponent
            ]
        }).compileComponents();

        component = TestBed.createComponent(NumberLineComponent);
        instance = component.componentInstance;
    });

    it('should be created', () => {
        expect(instance).toBeTruthy();
    });
});
