import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelSelectFilterComponent } from './LevelSelectFilterComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { LevelSelectFilterService } from './LevelSelectFilterService';
import { MockLevelSelectFilterService } from 'src/test/MockLevelSelectFilterService';

describe('LevelSelectFilterComponent', () => {
    let fixture: ComponentFixture<LevelSelectFilterComponent>;
    let component: LevelSelectFilterComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [ LevelSelectFilterComponent ],
            providers: [
                { provide: LevelSelectFilterService, useClass: MockLevelSelectFilterService },
                { provide: StateService, useValue: MockStateService },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LevelSelectFilterComponent);
        component = fixture.componentInstance;
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
