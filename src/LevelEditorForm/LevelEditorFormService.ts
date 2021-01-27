import { Injectable } from '@angular/core';
import { LevelEditorSelectOptionsViewModel } from '@krossr/types';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class LevelEditorFormService {
    constructor(
        private api: DefaultService
    ) {
    }

    async getOptions() {
        let response = await this.api.getLevelEditorOptions().toPromise() as LevelEditorSelectOptionsViewModel;
        return response;
    }
}
