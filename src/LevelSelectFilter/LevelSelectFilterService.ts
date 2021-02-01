import { Injectable } from '@angular/core';
import { DefaultService, LevelListFilterSelectOptionsViewModel } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class LevelSelectFilterService {
    constructor(
        private api: DefaultService
    ) {
    }

    async getOptions(): Promise<LevelListFilterSelectOptionsViewModel> {
        let response = await this.api.getLevelListOptions().toPromise();
        return response;
    }
}
