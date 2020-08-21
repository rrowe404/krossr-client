import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LevelEditorComponent } from './LevelEditorComponent';
import { LevelEditorModule } from './LevelEditorModule';
import { StateService } from '@uirouter/core';
import { MockStateService } from 'src/test/MockStateService';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LevelEditorComponent', () => {
    let fixture: ComponentFixture<LevelEditorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LevelEditorModule
            ],
            providers: [
                { provide: StateService, useValue: MockStateService }
            ]
        });

        fixture = TestBed.createComponent(LevelEditorComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});