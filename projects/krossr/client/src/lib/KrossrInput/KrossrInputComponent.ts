import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'krossr-input',
    templateUrl: './KrossrInputView.html'
})
export class KrossrInputComponent implements OnInit {
    @Input() name: string;
    @Input() control: FormControl;
    @Input() details: string;
    @Input() label: string;
    @Input() placeholder: string;
    @Input() type = 'text';
    @Output() updated: EventEmitter<string> = new EventEmitter();

    ngOnInit() {
        if (!this.control) {
            throw new Error('A FormControl is required!');
        }

        if (!this.placeholder) {
            this.placeholder = this.label;
        }
    }

    update(value: string) {
        this.control.setValue(value);
        this.updated.emit(value);
    }
}
