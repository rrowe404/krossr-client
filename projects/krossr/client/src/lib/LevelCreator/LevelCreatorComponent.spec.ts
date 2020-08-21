import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LevelCreatorComponent } from './LevelCreatorComponent';
import { LevelCreatorModule } from './LevelCreatorModule';
import { StateService } from '@uirouter/core';
import { MockStateService } from 'src/test/MockStateService';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LevelCreatorComponent', () => {
    let fixture: ComponentFixture<LevelCreatorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LevelCreatorModule
            ],
            providers: [
                { provide: StateService, useValue: MockStateService }
            ]
        });

        fixture = TestBed.createComponent(LevelCreatorComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});