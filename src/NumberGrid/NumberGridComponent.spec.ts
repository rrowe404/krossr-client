import { NumberGridComponent } from './NumberGridComponent';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { TileSizeService } from '../TileSize/TileSizeService';

describe('NumberGridComponent', () => {
    let fixture: ComponentFixture<NumberGridComponent>;
    let component: NumberGridComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        fixture = TestBed.createComponent(NumberGridComponent);
        component = fixture.componentInstance;
        component.goalMatrix = new BooleanMatrix(2, 2);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should update its tile size when setTileSize is called', () => {
        let tileSizeService: TileSizeService = TestBed.inject(TileSizeService);
        tileSizeService.setTileSize(500, 10);
        expect(component.tileSize).toBe('50px');
    });
});
