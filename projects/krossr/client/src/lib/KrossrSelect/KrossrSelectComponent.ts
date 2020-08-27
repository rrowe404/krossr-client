import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dictionary } from '@krossr/types';

@Component({
    selector: 'krossr-select',
    templateUrl: './KrossrSelectView.html'
})
export class KrossrSelectComponent implements OnInit {
    @Input() control: FormControl;
    @Input() label: string;
    @Input() name: string;
    @Input() optionMap: Dictionary<string | number>;
    @Output() updated: EventEmitter<string> = new EventEmitter();

    public options: string[];

    ngOnInit() {
        this.options = Object.keys(this.optionMap);
    }

    update(value: string) {
        this.control.setValue(value);
        this.updated.emit(value);
    }
}
