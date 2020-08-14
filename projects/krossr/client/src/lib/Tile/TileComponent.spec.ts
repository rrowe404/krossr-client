import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TileComponent } from './TileComponent';

describe('TileComponent', () => {
    let fixture: ComponentFixture<TileComponent>
    let component: TileComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TileComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(TileComponent);
        fixture.detectChanges();
    });
    
    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
