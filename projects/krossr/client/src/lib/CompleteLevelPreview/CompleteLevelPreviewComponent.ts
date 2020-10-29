import { Component, Input } from '@angular/core';
import { LevelListLevelViewModel } from '@krossr/types';

@Component({
    selector: 'krossr-complete-level-preview',
    styleUrls: ['../LevelPreview/LevelPreviewStyles.less'],
    templateUrl: 'CompleteLevelPreviewView.html'
})
export class CompleteLevelPreviewComponent {
    @Input() public level: LevelListLevelViewModel;
}
