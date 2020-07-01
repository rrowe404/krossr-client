import { ShiftService } from '../Shift/ShiftService';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mode-selector',
    styleUrls: ['./ModeSelectorStyles.less'],
    templateUrl: './ModeSelectorView.html'

})
export class ModeSelectorComponent implements OnInit {
    constructor(
        private shiftService: ShiftService
    ) {

    }

    public modes: IMode[];
    public selectedMode: string;

    ngOnInit() {
        this.modes = [
            {
                name: 'Select',
                onSelect: () => this.shiftService.shiftLock = false
            },
            {
                name: 'Mark',
                onSelect: () => this.shiftService.shiftLock = true
            }
        ];

        this.selectMode(this.modes[0]);
    }

    selectMode(mode: IMode) {
        this.selectedMode = mode.name;

        mode.onSelect();
    }
}

interface IMode {
    name: string;
    onSelect: () => void;
}
