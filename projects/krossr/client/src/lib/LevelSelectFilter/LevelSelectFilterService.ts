import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LevelListFilterSelectOptionsViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class LevelSelectFilterService {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    async getOptions(): Promise<LevelListFilterSelectOptionsViewModel> {
        let response = await this.httpClient.get('levels/options').toPromise() as LevelListFilterSelectOptionsViewModel;
        return response;
    }
}
