import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
    selector: 'krossr-select',
    templateUrl: './KrossrSelectView.html',
    imports: [ReactiveFormsModule, NgFor]
})
export class KrossrSelectComponent implements OnInit {
    @Input() control: FormControl;
    @Input() label: string;
    @Input() name: string;
    @Input() optionMap: { [key: string]: string | number } ;
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
