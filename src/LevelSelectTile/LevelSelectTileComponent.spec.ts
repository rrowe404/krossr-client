import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { LevelListLevelViewModel, LevelListViewModel } from '@krossr/types';
import { UIRouterModule } from '@uirouter/angular';
import { APP_BASE_HREF } from '@angular/common';
import { LevelSelectTileModule } from './LevelSelectTileModule';
import { LevelSelectTileComponent } from './LevelSelectTileComponent';

describe('LevelSelectTileComponent', () => {
    let fixture: ComponentFixture<LevelSelectTileComponent>;
    let component: LevelSelectTileComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LevelSelectTileModule,
                UIRouterModule.forRoot()
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: StateService, useValue: MockStateService },
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LevelSelectTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should only allow the user that created the level to see the edit button', () => {
        let level: LevelListLevelViewModel = {
            completed: false,
            editable: false,
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

        component.level = level;

        expect(component.canEdit()).toBeFalsy();

        level.editable = true;

        expect(component.canEdit()).toBeTruthy();
    });
});
