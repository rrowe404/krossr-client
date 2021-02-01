import * as _ from 'lodash';
import { AuthenticationService } from '../Authentication/AuthenticationService';
import { LevelService } from '../Level/LevelService';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AsyncLoadedComponent } from '../Async/AsyncLoadedComponent';
import { LevelListFilterOptions, LevelListViewModel } from '@krossr/api';

@Component({
    selector: 'krossr-level-select',
    styleUrls: ['./LevelSelectStyles.less'],
    templateUrl: './LevelSelectView.html'
})
export class LevelSelectComponent implements AsyncLoadedComponent, OnInit {
    constructor(
        public Authentication: AuthenticationService,
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
        let filter = _.extend(this.filter, options);

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
