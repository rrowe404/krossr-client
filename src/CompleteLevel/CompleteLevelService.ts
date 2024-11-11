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
        const { levelId } = params;
        localStorage.setItem(levelId.toString(), 'true');
    }
}
