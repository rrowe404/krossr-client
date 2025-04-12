import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { UncompleteLevelPreviewComponent } from '../UncompleteLevelPreview/UncompleteLevelPreviewComponent';
import { CompleteLevelPreviewComponent } from '../CompleteLevelPreview/CompleteLevelPreviewComponent';
import { LevelListFilterOptions, LevelListLevelViewModel } from 'src/Level/Level';

@Component({
    selector: 'krossr-level-select-tile',
    styleUrls: ['./LevelSelectTileStyles.less'],
    templateUrl: './LevelSelectTileView.html',
    imports: [NgIf, UncompleteLevelPreviewComponent, CompleteLevelPreviewComponent]
})
export class LevelSelectTileComponent {
    @Input() public level: LevelListLevelViewModel;
    @Output() public refilter: EventEmitter<LevelListFilterOptions> = new EventEmitter();

    filter(options: LevelListFilterOptions) {
        this.refilter.emit(options);
    }

    setSearchText(event: Event, text: string) {
        event.stopPropagation();
        this.filter({ searchText: text });
    }
}
