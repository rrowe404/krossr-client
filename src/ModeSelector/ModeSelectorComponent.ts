import { ShiftService } from '../Shift/ShiftService';
import { Component, DoCheck, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { ModeService } from './ModeService';

@Component({
    selector: 'krossr-mode-selector',
    styleUrls: ['./ModeSelectorStyles.less'],
    templateUrl: './ModeSelectorView.html',
    imports: [NgFor, NgClass]
})
export class ModeSelectorComponent implements DoCheck, OnInit {
    constructor(
        private modeService: ModeService,
        private shiftService: ShiftService
    ) {
    }

    public modes: { [key: string]: IMode };
    public modeRepeater: string[];

    public selectedMode: IMode;
    public tempMode: IMode; 

    ngDoCheck() {
        if (this.shiftService.shiftOn) {
            this.tempMode = this.selectedMode === this.modes.Select ? this.modes.Mark : this.modes.Select;
        } else {
            this.tempMode = null;
        }

        (this.tempMode ?? this.selectedMode).onSelect();
    }

    ngOnInit() {
        this.modes = {
            Select: {
                onSelect: () => this.modeService.selectMode = true
            },
            Mark: {
                onSelect: () => this.modeService.selectMode = false
            }
        };

        this.modeRepeater = Object.keys(this.modes);

        this.selectMode(this.modes.Select);
    }

    highlight(mode: string) {
        if (this.tempMode) {
            return this.tempMode === this.modes[mode];
        }

        return this.selectedMode === this.modes[mode];
    }

    selectMode(mode: IMode) {
        this.selectedMode = mode;

        mode.onSelect();
    }
}

interface IMode {
    onSelect: () => void;
}
