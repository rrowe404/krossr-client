import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LevelEditorComponent } from './LevelEditorComponent';
import { LevelEditorModule } from './LevelEditorModule';

describe('LevelEditorComponent', () => {
    let fixture: ComponentFixture<LevelEditorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                LevelEditorModule
            ]
        });

        fixture = TestBed.get(LevelEditorModule);
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});