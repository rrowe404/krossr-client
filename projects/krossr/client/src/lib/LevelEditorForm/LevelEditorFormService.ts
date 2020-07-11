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

    getOptions() {
        return this.httpClient.get('/levelEditor/options').toPromise().then((response: LevelEditorSelectOptionsViewModel) => {
            return response;
        });
    }
}
