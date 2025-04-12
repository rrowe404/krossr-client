import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelEditorFormComponent } from './LevelEditorFormComponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { LevelEditorFormService } from './LevelEditorFormService';
import { MockLevelEditorFormService } from 'src/test/MockLevelEditorFormService';
import { LevelEditorFormClearEventService } from './LevelEditorFormClearEventService';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestHelpers } from 'src/test/TestHelpers';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LevelEditorFormComponent', () => {
    let fixture: ComponentFixture<LevelEditorFormComponent>;
    let component: LevelEditorFormComponent;
    let matDialog: MatDialog;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [MatDialogModule,
        NoopAnimationsModule,
    ],
    providers: [
        { provide: LevelEditorFormService, useClass: MockLevelEditorFormService },
        { provide: StateService, useClass: MockStateService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();

        fixture = TestBed.createComponent(LevelEditorFormComponent);
        component = fixture.componentInstance;
        component.level = TestHelpers.getLevelViewModel();
        fixture.detectChanges();
        matDialog = TestBed.inject(MatDialog);
        spyOn(matDialog, 'open');
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should become ready', () => {
        return new Promise<void>(async (resolve, reject) => {
            await component.ngOnInit();
            expect(component.isReady).toBeTruthy();
            resolve();
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
