import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './GameComponent';
import { MatDialogModule } from '@angular/material/dialog';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { GameMatrix } from '../GameMatrix/GameMatrix';

describe('GameComponent', () => {
    let fixture: ComponentFixture<GameComponent>;
    let component: GameComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ MatDialogModule ],
            declarations: [ GameComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    describe('#checkForWin', () => {
        let getGameMatrix = (layout: boolean[][]) => {
            let matrix = new BooleanMatrix(2, 2);
            matrix.initializeWith(layout);
            return new GameMatrix(matrix, true);
        };

        it('should return false if there is no goal', () => {
            component.goalMatrix = null;
            expect(component.checkForWin()).toBeFalsy();
        });

        it('should return false if the goal does not match the game', () => {
            component.goalMatrix = getGameMatrix([[false, false], [true, true]]);
            component.gameMatrix = getGameMatrix([[false, false], [false, false]]);

            expect(component.checkForWin()).toBeFalsy();
        });

        it('should return true if the goal matches the game', () => {
            let goal = getGameMatrix([[true, true], [false, true]]);
            component.goalMatrix = goal;
            component.gameMatrix = goal;

            expect(component.checkForWin()).toBeTruthy();
        });
    });
});
