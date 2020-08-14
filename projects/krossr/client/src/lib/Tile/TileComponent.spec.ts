import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TileComponent } from './TileComponent';
import { TileState } from './TileState';

describe('TileComponent', () => {
    let fixture: ComponentFixture<TileComponent>
    let component: TileComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TileComponent ]
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

        component.fill('');
    });
});
