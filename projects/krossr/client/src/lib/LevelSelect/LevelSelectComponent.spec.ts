import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelSelectComponent } from './LevelSelectComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { LevelSelectModule } from './LevelSelectModule';

describe('LevelSelectComponent', () => {
    let fixture: ComponentFixture<LevelSelectComponent>;
    let component: LevelSelectComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LevelSelectModule,
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: StateService, useValue: MockStateService },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LevelSelectComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
