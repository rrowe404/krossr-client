import { Injectable } from '@angular/core';
import { CreateBannedLayoutBodyViewModel, CreateLevelBodyViewModel, DefaultService, UpdateLevelBodyViewModel } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class LevelService {
    constructor(
        private api: DefaultService
    ) {
    }

    banLevel(levelId: number, params: CreateBannedLayoutBodyViewModel) {
        return this.api.banLevel(levelId.toString(), params).toPromise();
    }

    createLevel(params: CreateLevelBodyViewModel) {
        return this.api.createLevel(params).toPromise();
    }

    getLevel(levelId: number) {
        return this.api.readLevel(levelId.toString()).toPromise();
    }

    // TODO query type
    async getLevels(query: any) {
        return this.api.paginate(
            query.pageNum,
            query.sizeRestriction,
            query.searchText,
            query.sortBy,
            query.sortDirection
        ).toPromise();
    }

    updateLevel(params: UpdateLevelBodyViewModel) {
        return this.api.updateLevel(params.id.toString(), params).toPromise();
    }

    removeLevel(levelId: number) {
        return this.api.deleteLevel(levelId.toString()).toPromise();
    }
}
