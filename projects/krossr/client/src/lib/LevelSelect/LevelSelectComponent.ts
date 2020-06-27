// TODO this breaks when not logged in

import { AuthenticationService } from '../Authentication/AuthenticationService';
import { Utils } from '../Utils/Utils';
import { LevelService } from '../Level/LevelService';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LevelSelectFilterOptions } from '../LevelSelectFilter/LevelSelectFilterOptions';

@Component({
    selector: 'level-select',
    styleUrls: ['./LevelSelectStyles.less'],
    templateUrl: './LevelSelectView.html'
})
export class LevelSelectComponent implements OnInit {
    static $name = 'levelSelect';

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

    private filter: LevelSelectFilterOptions;

    public formGroup: FormGroup;

    canEdit(level) {
        if (!this.Authentication.user) {
            return false;
        }

        return level === this.Authentication.user.id;
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

        this.levelService.getLevels(queryObj).then(data => {
            let i = 0;
            let allLevels = data.levels;
            let len = allLevels ? allLevels.length : 0;
            let currentLevel;

            this.totalPages = Math.ceil(data.count / data.numPerPage);
            this.levels = data.levels;

            // Calculate the size for each level so we can display it to the screen & sort by size
            for (; i < len; i++ ) {
                currentLevel = allLevels[i];
                currentLevel.prettySize = this.utils.prettySize(currentLevel.size);
            }
        });
    }

    refilter(options: LevelSelectFilterOptions) {
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
