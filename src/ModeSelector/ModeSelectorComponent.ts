import { ShiftService } from '../Shift/ShiftService';
import { Component, DoCheck, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'krossr-mode-selector',
    styleUrls: ['./ModeSelectorStyles.less'],
    templateUrl: './ModeSelectorView.html',
    imports: [NgFor, NgClass]
})
export class ModeSelectorComponent implements DoCheck, OnInit {
    constructor(
        private shiftService: ShiftService
    ) {
    }

    public modes: { [key: string]: IMode };
    public modeRepeater: string[];
    public selectedMode: IMode;

    ngDoCheck() {
        if (this.shiftService.shiftOn) {
            this.selectMode(this.modes.Mark);
        } else {
            this.selectMode(this.modes.Select);
        }
    }

    ngOnInit() {
        this.modes = {
            Select: {
                onSelect: () => this.shiftService.shiftOn = false
            },
            Mark: {
                onSelect: () => this.shiftService.shiftOn = true
            }
        };

        this.modeRepeater = Object.keys(this.modes);

        this.selectMode(this.modes.Select);
    }

    selectMode(mode: IMode) {
        this.selectedMode = mode;

        mode.onSelect();
    }
}

interface IMode {
    onSelect: () => void;
}
