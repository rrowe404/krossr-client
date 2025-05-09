import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounce } from '../Debounce/Debounce';
import { LevelSelectFilterService } from './LevelSelectFilterService';
import { AsyncLoadedComponent } from '../Async/AsyncLoadedComponent';
import { LevelListFilterSelectOptionsViewModel } from './LevelSelectFilterService';
import { AsyncContentComponent } from '../Async/AsyncContentComponent';
import { NgIf } from '@angular/common';
import { KrossrSelectComponent } from '../KrossrSelect/KrossrSelectComponent';
import { KrossrInputComponent } from '../KrossrInput/KrossrInputComponent';
import { LevelListFilterOptions } from 'src/Level/Level';

@Component({
    selector: 'krossr-level-select-filter',
    templateUrl: './LevelSelectFilterView.html',
    imports: [AsyncContentComponent, NgIf, ReactiveFormsModule, KrossrSelectComponent, KrossrInputComponent]
})
export class LevelSelectFilterComponent implements AsyncLoadedComponent, OnInit {
    @Output() public refilter: EventEmitter<LevelListFilterOptions> = new EventEmitter();

    public isReady = false;

    public formGroup: FormGroup;
    public sizeFormControl: FormControl;
    public searchTextFormControl: FormControl;
    public sortByFormControl: FormControl;
    public sortDirectionFormControl: FormControl;

    constructor(
        private levelSelectFilterService: LevelSelectFilterService
    ) {
    }

    public sizeMap: { [key: string]: number };
    public sortByMap: { [key: string]: string };
    public sortDirectionMap: { [key: string]: string };

    private options: LevelListFilterOptions = {};

    private debouncedChange = debounce(() => this.onChange());

    public async ngOnInit() {
        let options = await this.levelSelectFilterService.getOptions();
        this.setupOptions(options);

        this.formGroup = new FormGroup({});
        this.sizeFormControl = new FormControl();
        this.searchTextFormControl = new FormControl('');
        this.sortByFormControl = new FormControl();
        this.sortDirectionFormControl = new FormControl();

        this.formGroup.addControl('size', this.sizeFormControl);
        this.formGroup.addControl('searchText', this.searchTextFormControl);
        this.formGroup.addControl('sortBy', this.sortByFormControl);
        this.formGroup.addControl('sortDirection', this.sortDirectionFormControl);

        this.isReady = true;
    }

    public onChange() {
        this.refilter.emit(this.options);
    }

    private setupOptions(options: LevelListFilterSelectOptionsViewModel) {
        this.sizeMap = options.sizeOptions;
    }

    public updateSize(size: string) {
        this.options.sizeRestriction = this.sizeMap[size].toString();
        this.onChange();
    }

    public updateSearchText(text: string) {
        this.options.searchText = text;
        this.debouncedChange.next();
    }
}
