import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TileComponent } from './TileComponent';
import { TileState } from './TileState';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { DragBoxService } from '../DragBox/DragBoxService';
import { TileModule } from './TileModule';
import { TileFillEvent } from 'dist/krossr/client/lib/Tile/TileFillEvent';
import { TileFillEventService } from './TileFillEventService';

describe('TileComponent', () => {
    let fixture: ComponentFixture<TileComponent>;
    let component: TileComponent;
    let element: HTMLElement;

    function getFixture(setup?: (componentInstance: TileComponent) => void) {
        let componentFixture = TestBed.createComponent(TileComponent);
        let componentInstance = componentFixture.componentInstance;

        componentInstance.gameMatrix = new BooleanMatrix(2, 2);
        componentInstance.index = 0;
        componentInstance.selected = false;

        if (setup) {
            setup(componentInstance);
        }

        componentFixture.detectChanges();
        return componentFixture;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TileModule
            ]
        }).compileComponents();

        fixture = getFixture();
        component = fixture.componentInstance;
        element = fixture.debugElement.nativeElement;
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should initialize fill if a selected TileLayout is passed in and the tile is in edit mode', () => {
        let fixture2 = getFixture(component2 => {
            component2.isEditMode = true;
            component2.tile = { selected: true };
        });
        expect(fixture2.componentInstance.selected).toBeTruthy();
    });

    it('should have a working isPendingAndNotSelected fn', () => {
        component.pending = true;
        component.selected = false;
        expect(component.isPendingAndNotSelected()).toBeTrue();
    });

    it('should have a working isNotPending fn', () => {
        component.pending = false;
        expect(component.isNotPending()).toBeTrue();
    });

    it('should have a working fill fn', () => {
        component.fill(TileState.pending);
        expect(component.pending).toBeTruthy();

        component.fill(TileState.marked);
        expect(component.marked).toBeTruthy();
        expect(component.selected).toBeFalsy();
        expect(component.pending).toBeFalsy();

        component.fill(TileState.selected);
        expect(component.selected).toBeTruthy();
        expect(component.marked).toBeFalsy();
        expect(component.pending).toBeFalsy();

        component.fill(TileState.selected);
        expect(component.selected).toBeFalsy();

        component.fill(TileState.selected, true);
        expect(component.selected).toBeFalsy();

        component.fill(TileState.empty);
        expect(component.selected).toBeFalsy();
        expect(component.marked).toBeFalsy();
        expect(component.pending).toBeFalsy();

        component.fill('');
    });

    describe('#changeTile', () => {
        it('should do nothing if the tile is uneditable', () => {
            component.editable = false;
            component.changeTile({ x: 0, y: 0 }, true, TileState.selected);
            expect(component.selected).toBeFalsy();
        });

        it('should fill an editable tile', () => {
            component.editable = true;
            component.gameMatrix = new BooleanMatrix(2, 2);
            component.changeTile({ x: 0, y: 0 }, true, TileState.selected);
            expect(component.selected).toBeTruthy();
        });
    });

    describe('#mark', () => {
        it('should act as a toggle', () => {
            expect(component.marked).toBeFalsy();
            component.mark();
            expect(component.marked).toBeTruthy();
            component.mark();
            expect(component.marked).toBeFalsy();
        });
    });

    describe('mouseDown', () => {
        it('should catch the event', () => {
            let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);

            let event = new MouseEvent('mousedown');
            element.dispatchEvent(event);

            expect(dragBoxService.startCoord).toEqual({ x: 0, y: 0 });
            expect(dragBoxService.initState).toBeFalsy();
        });
    });

    describe('touchStart', () => {
        it('should catch the event', () => {
            let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);

            let event = new TouchEvent('touchstart');
            element.dispatchEvent(event);

            expect(dragBoxService.startCoord).toEqual({ x: 0, y: 0 });
            expect(dragBoxService.initState).toBeFalsy();
        });
    });

    describe('mouseMove', () => {
        it('should catch the event', () => {
            let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);

            let event = new MouseEvent('mousemove');
            element.dispatchEvent(event);

            expect(dragBoxService.endCoord).toBeFalsy();

            dragBoxService.startCoord = { x: 2, y: 2 };
            element.dispatchEvent(event);
            expect(dragBoxService.endCoord).toEqual({x: 0, y: 0});
        });

        it('should clear when the dragbox is smaller than the previous one', () => {
            let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);
            let tileFillEventService: TileFillEventService = TestBed.inject(TileFillEventService);
            spyOn(tileFillEventService.fill, 'emit');

            dragBoxService.startCoord = { x: 0, y: 0 };
            dragBoxService.endCoord = { x: 2, y: 2 };
            component.index = 0;

            let event = new MouseEvent('mousemove');
            element.dispatchEvent(event);

            expect(tileFillEventService.fill.emit).toHaveBeenCalled();
        });
    });

    describe('touchMove', () => {
        it('should catch the event', () => {
            let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);
            let touches = [new Touch({identifier: 0, target: element})];

            let event = new TouchEvent('touchmove', { touches });
            element.dispatchEvent(event);

            expect(dragBoxService.endCoord).toBeFalsy();
        });
    });

    describe('mouseUp', () => {
        it('should catch the event', () => {
            let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);

            let event = new MouseEvent('mouseup');
            element.dispatchEvent(event);

            expect(dragBoxService.endCoord).toEqual({x: 0, y: 0 });
        });
    });

    describe('touchEnd', () => {
        it('should catch the event', () => {
            let dragBoxService: DragBoxService = TestBed.inject(DragBoxService);

            let event = new TouchEvent('touchend');
            element.dispatchEvent(event);

            expect(dragBoxService.endCoord).toBeFalsy();
        });
    });

    describe('tileFillEvent', () => {
        it('should respond when no coords are specified', () => {
            spyOn(component, 'changeTile');

            let tileFillEventService: TileFillEventService = TestBed.inject(TileFillEventService);

            tileFillEventService.fill.emit({
                initState: true,
                override: TileState.selected
            });

            expect(component.changeTile).toHaveBeenCalled();
        });

        it('should respond when its own coord is specified', () => {
            spyOn(component, 'changeTile');

            let tileFillEventService: TileFillEventService = TestBed.inject(TileFillEventService);

            tileFillEventService.fill.emit({
                coords: [{x: 0, y: 0}],
                initState: true,
                override: TileState.selected
            });

            expect(component.changeTile).toHaveBeenCalled();
        });

        it('should not respond when its own coord is not specified', () => {
            spyOn(component, 'changeTile');

            let tileFillEventService: TileFillEventService = TestBed.inject(TileFillEventService);

            tileFillEventService.fill.emit({
                coords: [{x: 1, y: 0}],
                initState: true,
                override: TileState.selected
            });

            expect(component.changeTile).not.toHaveBeenCalled();
        });

        it('should not respond when it is not valid', () => {
            spyOn(component, 'changeTile');

            let tileFillEventService: TileFillEventService = TestBed.inject(TileFillEventService);

            tileFillEventService.fill.emit({
                coords: [{x: 0, y: 0}],
                initState: true,
                override: TileState.selected,
                validate: (tile) => tile.selected
            });

            expect(component.changeTile).not.toHaveBeenCalled();
        });
    });
});
