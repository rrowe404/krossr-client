import { AuthenticationService } from '../Authentication/AuthenticationService';
import { LevelService } from '../Level/LevelService';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LevelListViewModel, LevelListFilterOptions, LevelListLevelViewModel } from '@krossr/types';
import { KrossrDialogBase } from '../KrossrDialog/KrossrDialogBase';

@Component({
    selector: 'krossr-level-select',
    styleUrls: ['./LevelSelectStyles.less'],
    templateUrl: './LevelSelectView.html'
})
export class LevelSelectComponent extends KrossrDialogBase implements OnInit {
    constructor(
        public Authentication: AuthenticationService,
        private levelService: LevelService,
        protected matDialogRef: MatDialogRef<LevelSelectComponent>,
    ) {
        super(matDialogRef);
    }

    public totalPages: number;
    public currentPage = 0;
    public levels;
    public showFilter: boolean;

    private filter: LevelListFilterOptions = {};

    public formGroup: FormGroup;

    canEdit(level: LevelListLevelViewModel) {
        if (!this.Authentication.user) {
            return false;
        }

        return level.user.id === this.Authentication.user.id;
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

        Object.assign(queryObj, this.filter);

        this.levelService.getLevels(queryObj).then((data: LevelListViewModel) => {
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
