import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelSelectFilterComponent } from './LevelSelectFilterComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { LevelSelectFilterService } from './LevelSelectFilterService';
import { MockLevelSelectFilterService } from 'src/test/MockLevelSelectFilterService';
import { LevelSelectFilterModule } from './LevelSelectFilterModule';
import { LevelListFilterOptions } from '@krossr/api';

describe('LevelSelectFilterComponent', () => {
    let fixture: ComponentFixture<LevelSelectFilterComponent>;
    let component: LevelSelectFilterComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LevelSelectFilterModule
            ],
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
        return new Promise<void>(async (resolve, reject) => {
            await component.ngOnInit();
            expect(component.isReady).toBeTruthy();
            resolve();
        });
    });

    it('should update size', () => {
        component.sizeMap = { '5x5': 25 };

        spyOn(component.refilter, 'emit');
        component.updateSize('5x5');
        expect(component.refilter.emit).toHaveBeenCalledWith({ sizeRestriction: '25' } as LevelListFilterOptions);
    });
});
