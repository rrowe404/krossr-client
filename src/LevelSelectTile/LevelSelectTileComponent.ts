import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LevelListFilterOptions, LevelListLevelViewModel } from '@krossr/types';
import { AuthenticationService } from '../Authentication/AuthenticationService';

@Component({
    selector: 'krossr-level-select-tile',
    styleUrls: ['./LevelSelectTileStyles.less'],
    templateUrl: './LevelSelectTileView.html'
})
export class LevelSelectTileComponent {
    @Input() public level: LevelListLevelViewModel;
    @Output() public refilter: EventEmitter<LevelListFilterOptions> = new EventEmitter();

    constructor(
        public authentication: AuthenticationService
    ) {
    }

    canEdit() {
        return this.authentication &&
               this.authentication.user &&
               this.level &&
               this.level.user &&
               this.level.user.id === this.authentication.user.id;
    }

    filter(options: LevelListFilterOptions) {
        this.refilter.emit(options);
    }

    setSearchText(event: Event, text: string) {
        event.stopPropagation();
        this.filter({ searchText: text });
    }
}
