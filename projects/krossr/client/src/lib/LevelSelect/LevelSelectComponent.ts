import { AuthenticationService } from '../Authentication/AuthenticationService';
import { Utils } from '../Utils/Utils';
import { LevelService } from '../Level/LevelService';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LevelListViewModel, LevelListFilterOptions, LevelListLevelViewModel } from '@krossr/types';

@Component({
    selector: 'level-select',
    styleUrls: ['./LevelSelectStyles.less'],
    templateUrl: './LevelSelectView.html'
})
export class LevelSelectComponent implements OnInit {
    constructor(
        public Authentication: AuthenticationService,
        private levelService: LevelService,
        private matDialogRef: MatDialogRef<LevelSelectComponent>,
        private utils: Utils
    ) {
    }

    public totalPages: number;
    public currentPage = 0;
    public levels;
    public showFilter: boolean;

    private filter: LevelListFilterOptions;

    public formGroup: FormGroup;

    canEdit(level: LevelListLevelViewModel) {
        if (!this.Authentication.user) {
            return false;
        }

        return level.user.id === this.Authentication.user.id;
    }

    close() {
        this.matDialogRef.close();
    }

    ngOnInit() {
        this.find(this.currentPage);
        this.formGroup = new FormGroup({});
    }

    /* Find a list of levels */
    find(currentPage: number) {
        this.currentPage = currentPage;

        let queryObj = {
            pageNum: currentPage
        };

        if (this.filter) {
            Object.assign(queryObj, this.filter);
        }

        this.levelService.getLevels(queryObj).then((data: LevelListViewModel) => {
            let i = 0;
            let allLevels = data.levels;
            let len = allLevels ? allLevels.length : 0;
            let currentLevel;

            this.totalPages = Math.ceil(data.count / data.numPerPage);
            this.levels = data.levels;
        });
    }

    refilter(options: LevelListFilterOptions) {
        this.filter = options;
        this.find(0);
    }

    setSearchText(text: string) {
        this.filter.searchText = text;
        this.refilter(this.filter);
    }

    toggleShowFilter() {
        this.showFilter = !this.showFilter;
    }
}
