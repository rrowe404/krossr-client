import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounce } from '../Debounce/Debounce';
import { LevelListFilterOptions, LevelListFilterSelectOptionsViewModel, Dictionary } from '@krossr/types';
import { LevelSelectFilterService } from './LevelSelectFilterService';

@Component({
    selector: 'level-select-filter',
    templateUrl: './LevelSelectFilterView.html'
})
export class LevelSelectFilterComponent implements OnInit {
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

    public sizeMap: Dictionary<string>;
    public sizeOptions: string[];

    public sortByMap: Dictionary<string>;
    public sortByOptions: string[];

    public sortDirectionMap: Dictionary<string>;
    public sortDirectionOptions: string[];

    private options: LevelListFilterOptions = {};

    private debouncedChange = debounce(() => this.onChange());

    public ngOnInit() {
        this.levelSelectFilterService.getOptions().then(options => {
            this.setupOptions(options);

            this.formGroup = new FormGroup({});
            this.sizeFormControl = new FormControl(this.sizeOptions[0]);
            this.searchTextFormControl = new FormControl('');
            this.sortByFormControl = new FormControl(this.sortByOptions[0]);
            this.sortDirectionFormControl = new FormControl(this.sortDirectionOptions[0]);

            this.formGroup.addControl('size', this.sizeFormControl);
            this.formGroup.addControl('searchText', this.searchTextFormControl);
            this.formGroup.addControl('sortBy', this.sortByFormControl);
            this.formGroup.addControl('sortDirection', this.sortDirectionFormControl);

            this.isReady = true;
        });
    }

    public onChange() {
        this.refilter.emit(this.options);
    }

    private setupOptions(options: LevelListFilterSelectOptionsViewModel) {
        // todo, when forms are standardized a component can be created to pass the options directly into
        this.sizeMap = options.sizeOptions;
        this.sizeOptions = Object.keys(this.sizeMap);

        this.sortByMap = options.sortByOptions;
        this.sortByOptions = Object.keys(this.sortByMap);

        this.sortDirectionMap = options.sortDirectionOptions;
        this.sortDirectionOptions = Object.keys(options.sortDirectionOptions);
    }

    public updateSize(size: string) {
        this.sizeFormControl.setValue(size);
        this.options.sizeRestriction = this.sizeMap[size];
        this.onChange();
    }

    public updateSearchText(text: string) {
        this.searchTextFormControl.setValue(text);
        this.options.searchText = text;
        this.debouncedChange.next();
    }

    public updateSortBy(sortBy: string) {
        this.sortByFormControl.setValue(sortBy);
        this.options.sortBy = this.sortByMap[sortBy];
        this.onChange();
    }

    public updateSortDirection(sortDirection: string) {
        this.sortDirectionFormControl.setValue(sortDirection);
        this.options.sortDirection = this.sortDirectionMap[sortDirection];
        this.onChange();
    }
}
