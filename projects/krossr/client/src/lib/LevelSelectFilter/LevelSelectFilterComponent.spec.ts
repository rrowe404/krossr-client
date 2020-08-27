import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelSelectFilterComponent } from './LevelSelectFilterComponent';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStateService } from 'src/test/MockStateService';
import { StateService } from '@uirouter/core';

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
                { provide: StateService, useValue: MockStateService },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LevelSelectFilterComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
