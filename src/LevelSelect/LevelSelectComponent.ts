import { LevelService } from '../Level/LevelService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncLoadedComponent } from '../Async/AsyncLoadedComponent';
import { AsyncContentComponent } from '../Async/AsyncContentComponent';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { UIRouterModule } from '@uirouter/angular';
import { LevelSelectFilterComponent } from '../LevelSelectFilter/LevelSelectFilterComponent';
import { LevelSelectTileComponent } from '../LevelSelectTile/LevelSelectTileComponent';
import { PaginationComponent } from '../Pagination/PaginationComponent';
import { LevelListFilterOptions, LevelListViewModel } from 'src/Level/Level';

@Component({
    selector: 'krossr-level-select',
    styleUrls: ['./LevelSelectStyles.less'],
    templateUrl: './LevelSelectView.html',
    imports: [AsyncContentComponent, NgIf, ReactiveFormsModule, NgClass, UIRouterModule, LevelSelectFilterComponent, NgFor, LevelSelectTileComponent, PaginationComponent]
})
export class LevelSelectComponent implements AsyncLoadedComponent, OnInit {
    constructor(
        private levelService: LevelService
    ) {
    }

    public isReady = false;
    public totalPages: number;
    public currentPage = 0;
    public levels;
    public showFilter: boolean;

    private filter: LevelListFilterOptions = {};

    public formGroup: FormGroup;

    async ngOnInit() {
        await this.find(this.currentPage);
        this.formGroup = new FormGroup({});
        this.isReady = true;
    }

    /* Find a list of levels */
    async find(currentPage: number) {
        this.currentPage = currentPage;

        let queryObj = {
            pageNum: currentPage
        };

        Object.assign(queryObj, this.filter);

        let data: LevelListViewModel = await this.levelService.getLevels(queryObj);
        this.totalPages = Math.ceil(data.count / data.numPerPage);
        this.levels = data.levels;
    }

    refilter(options: LevelListFilterOptions) {
        this.filter = options;
        this.find(0);
    }

    extendFilter(options: LevelListFilterOptions) {
        let filter = { ...this.filter, ...options };

        this.refilter(filter);
    }

    setSearchText(text: string) {
        this.filter.searchText = text;
        this.refilter(this.filter);
    }

    toggleShowFilter() {
        this.showFilter = !this.showFilter;
    }
}
