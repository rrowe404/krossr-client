import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './GameComponent';
import { MatDialogModule } from '@angular/material/dialog';

describe('GameComponent', () => {
    let fixture: ComponentFixture<GameComponent>;
    let component: GameComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ MatDialogModule ],
            declarations: [ GameComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(GameComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
