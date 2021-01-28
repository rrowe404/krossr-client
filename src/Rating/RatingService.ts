import { Injectable } from '@angular/core';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class RatingService {
    constructor(
        private api: DefaultService
    ) {
    }

    rate(levelId: number, rating: number) {
        return this.api.upsertRating(levelId.toString(), { rating }).toPromise();
    }
}
