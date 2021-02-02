import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelEditorComponent } from './LevelEditorComponent';
import { LevelEditorModule } from './LevelEditorModule';
import { StateService } from '@uirouter/core';
import { MockStateService } from 'src/test/MockStateService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { LevelService } from '../Level/LevelService';
import { BASE_PATH, UpdateLevelBodyViewModel } from '@krossr/api';
import { TestHelpers } from 'src/test/TestHelpers';

describe('LevelEditorComponent', () => {
    let fixture: ComponentFixture<LevelEditorComponent>;
    let component: LevelEditorComponent;
    let matDialog: MatDialog;
    let testLevelId = 1;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LevelEditorModule
            ],
            providers: [
                { provide: StateService, useClass: MockStateService },
                { provide: BASE_PATH, useValue: '' }
            ]
        });

        fixture = TestBed.createComponent(LevelEditorComponent);
        component = fixture.componentInstance;
        component.levelId = testLevelId;
        component.gameMatrix = new GameMatrix(new BooleanMatrix(2, 2), true);
        fixture.detectChanges();
        matDialog = TestBed.inject(MatDialog);
        spyOn(matDialog, 'open');
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should confirm update', () => {
        spyOn(component, 'updateLevel');

        let level = { id: testLevelId, decodedLayout: [[]], name: 'trogdor' };
        component.confirmUpdate(level);
        let options = component.getConfirmUpdateOptions(level);
        options.data.submitAction();

        expect(matDialog.open).toHaveBeenCalled();
        expect(component.updateLevel).toHaveBeenCalledWith(level);
    });

    it('should update', async () => {
        let levelService: LevelService = TestBed.inject(LevelService);
        let stateService: StateService = TestBed.inject(StateService);
        spyOn(stateService, 'go');

        let level = { ...TestHelpers.getLevelViewModel(), decodedLayout: [[]] } as UpdateLevelBodyViewModel;
        spyOn(levelService, 'updateLevel').and.returnValue(Promise.resolve(TestHelpers.getLevelViewModel()));

        await component.updateLevel(level);
        expect(stateService.go).toHaveBeenCalled();
    });

    it('should handle an update error', async () => {
        let levelService: LevelService = TestBed.inject(LevelService);
        let error = 'pitiful.';
        spyOn(levelService, 'updateLevel').and.rejectWith(TestHelpers.getErrorResponseObject(error));

        let level = { id: testLevelId, decodedLayout: [[]], name: 'trogdor' };

        await component.updateLevel(level);
        expect(component.error).toBe(error);
    });

    it('should set up a level for editing correctly', async () => {
        let level = TestHelpers.getLevelViewModel();
        let levelService: LevelService = TestBed.inject(LevelService);
        spyOn(levelService, 'getLevel').and.returnValue(Promise.resolve(level));

        component.levelId = level.id;

        await component.findOne();
        expect(component.level.decodedLayout).toBeTruthy();
        expect(component.level.name).toBe('trogdor');
        expect(component.isReady).toBeTruthy();
    });
});
