import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompletedLevelBodyViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class CompleteLevelService {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    completeLevel(params: CompletedLevelBodyViewModel) {
        return this.httpClient.post(`levels/${params.levelId}/complete`, params).toPromise();
    }
}
