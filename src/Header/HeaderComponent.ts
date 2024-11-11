import { Component } from '@angular/core';
import { HelpComponent } from '../Help/HelpComponent';
import { StateService } from '@uirouter/core';
import { LevelRoutes } from '../Routing/RouteNames';
import { KrossrDialogService } from 'src/KrossrDialog/KrossrDialogService';

@Component({
    selector: 'krossr-header',
    styleUrls: ['./HeaderStyles.less'],
    templateUrl: './HeaderView.html'
})
export class HeaderComponent {
    constructor(
        private dialogService: KrossrDialogService,
        private stateService: StateService
    ) {

    }

    openHelp() {
        this.dialogService.open(HelpComponent);
    }

    openLevelSelect() {
        this.stateService.go(LevelRoutes.list);
    }
}
