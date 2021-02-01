import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelSelectComponent } from './LevelSelectComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { LevelSelectModule } from './LevelSelectModule';
import { UIRouterModule } from '@uirouter/angular';
import { LevelService } from '../Level/LevelService';
import { APP_BASE_HREF } from '@angular/common';
import { LevelListViewModel } from '@krossr/api';

describe('LevelSelectComponent', () => {
    let fixture: ComponentFixture<LevelSelectComponent>;
    let component: LevelSelectComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LevelSelectModule,
                UIRouterModule.forRoot()
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: StateService, useValue: MockStateService },
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LevelSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should set search text', () => {
        let levelService: LevelService = TestBed.inject(LevelService);

        spyOn(levelService, 'getLevels').and.returnValue(Promise.resolve({

        } as LevelListViewModel));

        component.setSearchText('ayy lmao');
        expect(levelService.getLevels).toHaveBeenCalledWith({ pageNum: 0, searchText: 'ayy lmao' });
    });

    it('should toggle showFilter', () => {
        component.showFilter = false;
        component.toggleShowFilter();
        expect(component.showFilter).toBeTruthy();
        component.toggleShowFilter();
        expect(component.showFilter).toBeFalsy();
    });
});
