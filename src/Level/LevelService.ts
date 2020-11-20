import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateLevelBodyViewModel, LevelListViewModel, UpdateLevelBodyViewModel } from '@krossr/types';

@Injectable({
    providedIn: 'root'
})
export class LevelService {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    banLevel(levelId: number) {
        return this.httpClient.post(`levels/${levelId}/ban`, {}).toPromise();
    }

    createLevel(params: CreateLevelBodyViewModel) {
        return this.httpClient.post('levels', params).toPromise();
    }

    getLevel(levelId: number) {
        return this.httpClient.get(`levels/${levelId}`).toPromise();
    }

    async getLevels(query: any) {
        return this.httpClient.get('levels', {
            params: new HttpParams({ fromObject: query})
        }).toPromise() as Promise<LevelListViewModel>;
    }

    updateLevel(params: UpdateLevelBodyViewModel) {
        return this.httpClient.put(`levels/${params.id}`, params).toPromise();
    }

    removeLevel(levelId: number) {
        return this.httpClient.delete(`levels/${levelId}`).toPromise();
    }
}
