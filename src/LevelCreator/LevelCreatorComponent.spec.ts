import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelCreatorComponent } from './LevelCreatorComponent';
import { LevelCreatorModule } from './LevelCreatorModule';
import { StateService } from '@uirouter/core';
import { MockStateService } from 'src/test/MockStateService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { LevelService } from '../Level/LevelService';
import { MockLevelService } from 'src/test/MockLevelService';
import { TestHelpers } from 'src/test/TestHelpers';

describe('LevelCreatorComponent', () => {
    let fixture: ComponentFixture<LevelCreatorComponent>;
    let component: LevelCreatorComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LevelCreatorModule
            ],
            providers: [
                { provide: LevelService, useClass: MockLevelService },
                { provide: StateService, useClass: MockStateService }
            ]
        });

        fixture = TestBed.createComponent(LevelCreatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should use the existing level in createNewLevel && createGameArray if possible', () => {
        component.level = TestHelpers.getLevelViewModel();
        component.createGameArray();
        expect(component.gameMatrix.length).toBe(5);

        component.createNewLevel();
        expect(component.level.name).toBe(TestHelpers.getLevelViewModel().name);
    });

    function setupForSubmit(theComponent: LevelCreatorComponent) {
        theComponent.level = TestHelpers.getLevelViewModel();
        let layout = [[false, true], [true, false]];
        let booleanMatrix = new BooleanMatrix(2, 2);
        booleanMatrix.initializeWith(layout);
        theComponent.gameMatrix = new GameMatrix(booleanMatrix, true);
    }

    it('should submit a completed level', () => {
        setupForSubmit(component);
        let submit = () => component.submitCreate();

        expect(submit).not.toThrow();
    });

    it('should handle a submit failure', async () => {
        setupForSubmit(component);

        let levelService: LevelService = TestBed.inject(LevelService);
        spyOn(levelService, 'createLevel').and.returnValue(Promise.reject({ message: 'haw haw' }));

        await component.submitCreate();
        expect(component.error).toBeTruthy();
    });
});
