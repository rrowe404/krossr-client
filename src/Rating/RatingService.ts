import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RatingService {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    rate(levelId: number, rating: number) {
        let url = `levels/${levelId}/ratings`;

        let data = {
            rating
        };

        return this.httpClient.post(url, data).toPromise();
    }
}
