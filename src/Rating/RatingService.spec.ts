import { TestBed } from '@angular/core/testing';
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

    it('should make a request to the rating endpoint', async () => {
        let promise = service.rate(1, 5);

        httpTestingController.expectOne('levels/1/ratings').flush({});

        await promise;
        expect(true).toBe(true);
    });
});
