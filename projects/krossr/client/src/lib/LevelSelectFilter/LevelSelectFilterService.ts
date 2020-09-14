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

    public getOptions(): Promise<LevelListFilterSelectOptionsViewModel> {
        return this.httpClient.get('levels/options').toPromise().then((response: LevelListFilterSelectOptionsViewModel) => {
            return response;
        });
    }
}
