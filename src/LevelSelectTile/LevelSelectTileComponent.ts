import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LevelListFilterOptions, LevelListLevelViewModel } from '@krossr/types';

@Component({
    selector: 'krossr-level-select-tile',
    styleUrls: ['./LevelSelectTileStyles.less'],
    templateUrl: './LevelSelectTileView.html'
})
export class LevelSelectTileComponent {
    @Input() public level: LevelListLevelViewModel;
    @Output() public refilter: EventEmitter<LevelListFilterOptions> = new EventEmitter();

    canEdit() {
        return this.level.editable;
    }

    filter(options: LevelListFilterOptions) {
        this.refilter.emit(options);
    }

    setSearchText(event: Event, text: string) {
        event.stopPropagation();
        this.filter({ searchText: text });
    }
}
