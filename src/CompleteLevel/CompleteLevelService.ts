import { Injectable } from '@angular/core';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class CompleteLevelService {
    constructor(
        private api: DefaultService
    ) {
    }

    completeLevel(params: { levelId: number }) {
        return this.api.completeLevel(params.levelId.toString()).toPromise();
    }
}
