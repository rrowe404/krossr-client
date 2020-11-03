import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LevelEditorSelectOptionsViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class LevelEditorFormService {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    async getOptions() {
        let response = await this.httpClient.get('levelEditor/options').toPromise() as LevelEditorSelectOptionsViewModel;
        return response;
    }
}
