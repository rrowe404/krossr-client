import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelEditorFormComponent } from './LevelEditorFormComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { LevelEditorFormService } from './LevelEditorFormService';
import { MockLevelEditorFormService } from 'src/test/MockLevelEditorFormService';

describe('LevelEditorFormComponent', () => {
    let fixture: ComponentFixture<LevelEditorFormComponent>;
    let component: LevelEditorFormComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
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
});
