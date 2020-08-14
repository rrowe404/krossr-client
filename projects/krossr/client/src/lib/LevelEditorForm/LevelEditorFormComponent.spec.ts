import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelEditorFormComponent } from './LevelEditorFormComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';

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
                { provide: StateService, useValue: MockStateService },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LevelEditorFormComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
