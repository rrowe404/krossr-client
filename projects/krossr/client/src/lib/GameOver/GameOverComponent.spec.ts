import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GameOverComponent } from './GameOverComponent';
import { GameOverModule } from './GameOverModule';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UIRouterModule } from '@uirouter/angular';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';
import { APP_BASE_HREF } from '@angular/common';

describe('GameOverComponent', () => {
    let fixture: ComponentFixture<GameOverComponent>;
    let component: GameOverComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                GameOverModule,
                UIRouterModule.forRoot()
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: { levelId: 1 } },
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(GameOverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should close this window and open the level select', () => {
        let matDialog = TestBed.inject(MatDialog);

        spyOn(component, 'close');
        spyOn(matDialog, 'open');

        component.newLevel();
        expect(component.close).toHaveBeenCalled();
        expect(matDialog.open).toHaveBeenCalledWith(LevelSelectComponent);
    });
});