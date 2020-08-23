import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelSelectFilterComponent } from './LevelSelectFilterComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { LevelSelectFilterService } from './LevelSelectFilterService';
import { MockLevelSelectFilterService } from 'src/test/MockLevelSelectFilterService';
import { LevelListFilterOptions } from '@krossr/types';

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

    it('should update size', () => {
        component.sizeMap = { '5x5': 25 };

        spyOn(component.refilter, 'emit');
        component.updateSize('5x5');
        expect(component.refilter.emit).toHaveBeenCalledWith({ sizeRestriction: '25' } as LevelListFilterOptions);
    });

    it('should update sort by', () => {
        component.sortByMap = { 'Date': 'date' };

        spyOn(component.refilter, 'emit');
        component.updateSortBy('Date');
        expect(component.refilter.emit).toHaveBeenCalledWith({ sortBy: 'date' } as LevelListFilterOptions);
    });

    it('should update search text', () => {
        spyOn(component.refilter, 'emit');

        component.updateSearchText('hobbitses');
        component.onChange();
        expect(component.refilter.emit).toHaveBeenCalledWith({ searchText: 'hobbitses' } as LevelListFilterOptions);
    });

    it('should update sort direction', () => {
        component.sortDirectionMap = { 'Descending': 'DESC' };

        spyOn(component.refilter, 'emit');
        component.updateSortDirection('Descending');
        expect(component.refilter.emit).toHaveBeenCalledWith({ sortDirection: 'DESC' } as LevelListFilterOptions);
    });
});
