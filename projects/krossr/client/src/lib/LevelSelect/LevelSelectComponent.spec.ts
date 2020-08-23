import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelSelectComponent } from './LevelSelectComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { LevelSelectModule } from './LevelSelectModule';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { LevelListLevelViewModel, LevelListViewModel } from '@krossr/types';
import { UIRouterModule } from '@uirouter/angular';
import { LevelService } from '../Level/LevelService';
import { APP_BASE_HREF } from '@angular/common';

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

    it('should only allow the user that created the level to see the edit button', () => {
        let authenticationService: AuthenticationService = TestBed.inject(AuthenticationService);

        authenticationService.signIn({ id: 1, username: 'Rosie' });

        let level: LevelListLevelViewModel = {
            avgRating: '3.5',
            createdAt: 'nooow',
            user: {
                id: 2,
                username: 'Waluigi'
            },
            prettySize: '5x5',
            layout: '',
            name: 'Waaah',
            size: 25
        };

        expect(component.canEdit(level)).toBeFalsy();

        level.user.id = 1;

        expect(component.canEdit(level)).toBeTruthy();

        authenticationService.signOut();

        expect(component.canEdit(level)).toBeFalsy();
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
