import { TestBed } from "@angular/core/testing";
import { RatingService } from './RatingService';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RatingService', () => {
    let service: RatingService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(RatingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make a request to the rating endpoint', () => {
        let promise = service.rate(1, 5).then(() => {
            expect(true).toBe(true);
        });

        const req = httpTestingController.expectOne('levels/1/ratings');

        req.flush({});

        return promise;
    });
});
