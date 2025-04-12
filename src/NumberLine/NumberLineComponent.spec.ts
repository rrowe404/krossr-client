import { NumberLineComponent } from './NumberLineComponent';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';

describe('NumberLineComponent', () => {
    function getFixture(
        game: BooleanMatrix,
        goal: BooleanMatrix,
        index: number,
        orientation: 'horizontal' | 'vertical'
    ): ComponentFixture<NumberLineComponent> {
        let fixture = TestBed.createComponent(NumberLineComponent);
        let component = fixture.componentInstance;

        component.gameMatrix = game;
        component.goalMatrix = goal;
        component.index = index;
        component.orientation = orientation;

        fixture.detectChanges();

        return fixture;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({ }).compileComponents();

    });

    it('should be created', () => {
        let matrix = new BooleanMatrix(2, 2);
        expect(getFixture(matrix, matrix, 0, 'horizontal').componentInstance).toBeTruthy();
    });

    it('should contain the correct line content', () => {
        let game = new BooleanMatrix(2, 2);
        game.initializeWith([[false, false], [false, false]]);

        let goal = new BooleanMatrix(2, 2);
        goal.initializeWith([[true, false], [true, false]]);

        let component = getFixture(game, goal, 0, 'horizontal').componentInstance;

        expect(component.lineContent).toEqual([
            { finished: false, text: 1 }
        ]);

        component = getFixture(game, goal, 1, 'horizontal').componentInstance;

        expect(component.lineContent).toEqual([
            { finished: false, text: 1 }
        ]);

        component = getFixture(game, goal.rotate(), 0, 'vertical').componentInstance;

        expect(component.lineContent).toEqual([
            { finished: false, text: 2 }
        ]);

        component = getFixture(game, goal.rotate(), 1, 'vertical').componentInstance;

        expect(component.lineContent).toEqual([
            { finished: true, text: 0 }
        ]);
    });

    it('should toggle finished', () => {
        let game = new BooleanMatrix(2, 2);
        game.initializeWith([[false, false], [false, false]]);

        let component = getFixture(game, game, 0, 'horizontal').componentInstance;

        let entry = { text: 1, finished: true };
        component.toggleFinished(entry);
        expect(entry.finished).toBeFalsy();
        component.toggleFinished(entry);
        expect(entry.finished).toBeTruthy();
    });
});
