import { LevelComponentBase } from './LevelComponentBase';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { GameSizeService } from '../GameSize/GameSizeService';
import { ResizeEventService } from '../Resize/ResizeEventService';

@Component({ template: '' })
class MockLevelComponent extends LevelComponentBase {
}

describe('LevelComponentBase', () => {
    let fixture: ComponentFixture<MockLevelComponent>;
    let component: MockLevelComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [MockLevelComponent]
}).compileComponents();

        fixture = TestBed.createComponent(MockLevelComponent);
        component = fixture.componentInstance;
        component.gameMatrix = new GameMatrix(new BooleanMatrix(2, 2), true);
        fixture.detectChanges();
    });

    it('should respond to formClearEvents', () => {
        spyOn(component.gameMatrix, 'clear');

        let levelEditorFormClearEventService: LevelEditorFormClearEventService = TestBed.inject(LevelEditorFormClearEventService);
        levelEditorFormClearEventService.formClearEvent.emit();

        expect(component.gameMatrix.clear).toHaveBeenCalled();
    });

    it('should respond to windowResized events', () => {
        let gameSizeService: GameSizeService = TestBed.inject(GameSizeService);
        spyOn(gameSizeService, 'calculatePlayableArea');
        spyOn(gameSizeService, 'setGameSize');

        let resizeEventService: ResizeEventService = TestBed.inject(ResizeEventService);
        resizeEventService.windowResized.emit();

        expect(gameSizeService.calculatePlayableArea).toHaveBeenCalled();
        expect(gameSizeService.setGameSize).toHaveBeenCalledWith(2);

        let withoutMatrix = () => {
            component.gameMatrix = null;
            resizeEventService.windowResized.emit();
        };

        expect(withoutMatrix).not.toThrow();
    });
});
