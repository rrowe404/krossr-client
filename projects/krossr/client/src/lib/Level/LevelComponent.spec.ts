import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelComponent } from './LevelComponent';
import { StateService } from '@uirouter/angular';
import { MockStateService } from 'src/test/MockStateService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LevelModule } from './LevelModule';

describe('LevelComponent', () => {
    let fixture: ComponentFixture<LevelComponent>;
    let component: LevelComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LevelModule
            ],
            providers: [
                { provide: StateService, useClass: MockStateService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LevelComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});
