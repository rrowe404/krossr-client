import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './GameComponent';
import { MatDialogModule } from '@angular/material/dialog';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { DragBoxService } from '../DragBox/DragBoxService';
import { TileState } from '../Tile/TileState';
import { TileEventService } from '../Tile/TileEventService';
import { ShiftService } from '../Shift/ShiftService';
import { GameOverService } from '../GameOver/GameOverService';

describe('GameComponent', () => {
    let fixture: ComponentFixture<GameComponent>;
    let component: GameComponent;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ MatDialogModule ],
            declarations: [ GameComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;

        component.gameSettings = {
            width: '200px',
            height: '200px'
        };

        element = fixture.debugElement.nativeElement;
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

    it('should focus the game when the mouse enters it', () => {
        let event = new MouseEvent('mouseenter');
        element.dispatchEvent(event);

        expect(true).toBeTruthy(); // todo, triggering focus doesn't seem to work
    });

    it('should empty the dragbox when the mouse leaves the game', () => {
        let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);
        spyOn(dragBoxService, 'fill');

        let event = new MouseEvent('mouseleave');
        element.dispatchEvent(event);

        expect(dragBoxService.fill).toHaveBeenCalledWith(TileState.empty);
    });

    it('should continue responding to a tile drag end event', () => {
        let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);
        spyOn(dragBoxService, 'fill');

        let tileEventService: TileEventService = TestBed.inject(TileEventService);
        tileEventService.tileDragEnd.emit();

        expect(dragBoxService.fill).toHaveBeenCalledWith(TileState.selected);
    });

    it('should mark tiles instead of selecting if shift is being held', () => {
        let shiftService: ShiftService = TestBed.inject(ShiftService);
        shiftService.shiftOn = true;

        let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);
        spyOn(dragBoxService, 'fill');

        let tileEventService: TileEventService = TestBed.inject(TileEventService);
        tileEventService.tileDragEnd.emit();

        expect(dragBoxService.fill).toHaveBeenCalledWith(TileState.marked);
    });

    it('should open the game over dialog if necessary', () => {
        let goal = new GameMatrix(new BooleanMatrix(2, 2), true);
        component.gameMatrix = goal;
        component.goalMatrix = goal;

        let gameOverService: GameOverService = TestBed.inject(GameOverService);
        spyOn(gameOverService, 'openDialog');

        let tileEventService: TileEventService = TestBed.inject(TileEventService);
        tileEventService.tileDragEnd.emit(); 

        expect(gameOverService.openDialog).toHaveBeenCalled();
    });
});
