import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TileComponent } from './TileComponent';
import { TileState } from './TileState';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { DragBoxService } from '../DragBox/DragBoxService';

describe('TileComponent', () => {
    let fixture: ComponentFixture<TileComponent>;
    let component: TileComponent;
    let dragBoxServiceSpy: jasmine.SpyObj<DragBoxService>;

    beforeEach(() => {
        dragBoxServiceSpy = jasmine.createSpyObj('DragBoxService', ['startCoord']);

        TestBed.configureTestingModule({
            declarations: [ TileComponent ],
            providers: [
                { provide: DragBoxService, useValue: dragBoxServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
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
});
