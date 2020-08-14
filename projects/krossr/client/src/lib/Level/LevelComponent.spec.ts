import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelComponent } from './LevelComponent';
import { StateService } from '@uirouter/angular';
import { MockStateService } from 'src/test/MockStateService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('LevelComponent', () => {
    let fixture: ComponentFixture<LevelComponent>;
    let component: LevelComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                HttpClientTestingModule
            ],
            declarations: [ LevelComponent ],
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
