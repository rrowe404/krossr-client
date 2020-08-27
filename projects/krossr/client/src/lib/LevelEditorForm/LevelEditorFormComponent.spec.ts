import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelEditorFormComponent } from './LevelEditorFormComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { LevelEditorFormService } from './LevelEditorFormService';
import { MockLevelEditorFormService } from 'src/test/MockLevelEditorFormService';
import { LevelEditorFormClearEventService } from './LevelEditorFormClearEventService';
import { LevelService } from '../Level/LevelService';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';
import { HomeRoutes } from '../Routing/RouteNames';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';

describe('LevelEditorFormComponent', () => {
    let fixture: ComponentFixture<LevelEditorFormComponent>;
    let component: LevelEditorFormComponent;
    let matDialog: MatDialog;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                NoopAnimationsModule,
                HttpClientTestingModule
            ],
            declarations: [ LevelEditorFormComponent ],
            providers: [
                { provide: LevelEditorFormService, useClass: MockLevelEditorFormService },
                { provide: StateService, useClass: MockStateService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LevelEditorFormComponent);
        component = fixture.componentInstance;
        component.level = {
            ready: true,
            size: 25,
            layout: '',
            name: 'wat'
        };
        fixture.detectChanges();
        matDialog = TestBed.inject(MatDialog);
        spyOn(matDialog, 'open');
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should become ready', () => {
        return new Promise((resolve, reject) => {
            component.ngOnInit().then(() => {
                expect(component.isReady).toBeTruthy();
                resolve();
            });
        });
    });

    it('should update size', () => {
        component.sizeMap = { 10: 100 };
        component.updateSize(10);
        expect(component.level.size).toBe(100);
    });

    it('should update name', () => {
        component.updateName('astronautalis');
        expect(component.level.name).toBe('astronautalis');
    });

    it('should have a clear all fn', () => {
        let formClearService: LevelEditorFormClearEventService = TestBed.inject(LevelEditorFormClearEventService);
        spyOn(formClearService.formClearEvent, 'emit');

        component.clearAll();
        expect(formClearService.formClearEvent.emit).toHaveBeenCalled();
    });

    it('should confirm clear', () => {
        let confirmationOptions = component.getClearConfirmationOptions();

        component.confirmClear();
        confirmationOptions.data.submitAction();

        expect(matDialog.open).toHaveBeenCalled();
    });

    it('should confirm remove', () => {
        let confirmationOptions = component.getRemoveConfirmationOptions();
        component.confirmRemove();
        confirmationOptions.data.submitAction();
        expect(matDialog.open).toHaveBeenCalled();
    });

    describe('#remove', () => {
        it('should remove, then open LevelSelect and go home', () => {
            let levelService: LevelService = TestBed.inject(LevelService);
            let stateService: StateService = TestBed.inject(StateService);

            spyOn(levelService, 'removeLevel').and.returnValue(Promise.resolve({}));
            spyOn(stateService, 'go');

            return component.remove({ id: 1 }).then(() => {
                expect(levelService.removeLevel).toHaveBeenCalled();
                expect(matDialog.open).toHaveBeenCalledWith(LevelSelectComponent);
                expect(stateService.go).toHaveBeenCalledWith(HomeRoutes.home, {}, { reload: true });
            });
        });
    });

    it('should submit', () => {
        spyOn(component.submitAction, 'emit');
        component.submit();
        expect(component.submitAction.emit).toHaveBeenCalled();
    });

    it('should display the submit text correctly', () => {
        component.error = 'what';
        expect(component.submitButtonText()).toBe(component.error);
        component.submitText = 'hmm';
        expect(component.submitButtonText()).toBe(component.error);
        component.error = null;
        expect(component.submitButtonText()).toBe(component.submitText);
    });
});
