import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelComponent } from './LevelComponent';
import { StateService, UIRouterModule } from '@uirouter/angular';
import { MockStateService } from 'src/test/MockStateService';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LevelModule } from './LevelModule';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { GameOverService } from '../GameOver/GameOverService';
import { APP_BASE_HREF } from '@angular/common';
import { LevelService } from './LevelService';
import { TestHelpers } from 'src/test/TestHelpers';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LevelComponent', () => {
    let fixture: ComponentFixture<LevelComponent>;
    let component: LevelComponent;
    let gameOverService: GameOverService;
    let levelService: LevelService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
    imports: [LevelModule,
        UIRouterModule.forRoot()],
    providers: [
        { provide: StateService, useClass: MockStateService },
        { provide: APP_BASE_HREF, useValue: '/' },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

        fixture = TestBed.createComponent(LevelComponent);
        levelService = TestBed.inject(LevelService);
        const testLevel = TestHelpers.getLevelViewModel();
        spyOn(levelService, 'getLevel').and.returnValue(await Promise.resolve(testLevel));

        component = fixture.componentInstance;
        component.levelLayout = testLevel.layout;
        await component.ngOnInit();
        gameOverService = TestBed.inject(GameOverService);
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
        expect(fixture.componentInstance.level).toBeTruthy();
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

    it('should open the game over dialog if necessary', () => {
        let goal = new GameMatrix(new BooleanMatrix(2, 2), true);
        component.gameMatrix = goal;
        component.goalMatrix = goal;

        spyOn(gameOverService, 'openDialog');

        component.checkForWin();

        expect(gameOverService.openDialog).toHaveBeenCalled();
    });
});
