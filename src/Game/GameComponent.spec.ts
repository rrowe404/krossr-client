import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './GameComponent';
import { MatDialogModule } from '@angular/material/dialog';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { DragBoxService } from '../DragBox/DragBoxService';
import { TileState } from '../Tile/TileState';
import { TileEventService } from '../Tile/TileEventService';
import { ShiftService } from '../Shift/ShiftService';

describe('GameComponent', () => {
    let fixture: ComponentFixture<GameComponent>;
    let component: GameComponent;
    let element: HTMLElement;

    let getGameMatrix = (layout: boolean[][]) => {
        let matrix = new BooleanMatrix(2, 2);
        matrix.initializeWith(layout);
        return new GameMatrix(matrix, true);
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [MatDialogModule, GameComponent]
}).compileComponents();

        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;

        component.gameSize = {
            width: '200px',
            height: '200px'
        };

        component.gameMatrix = getGameMatrix([[]]);

        element = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
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
});
