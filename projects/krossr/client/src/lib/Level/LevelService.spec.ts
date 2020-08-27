import { LevelService } from './LevelService';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('LevelService', () => {
    let service: LevelService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LevelService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create a level', () => {
        let promise = service.createLevel({ name: 'testname', decodedLayout: [[]]});
        let req = httpTestingController.expectOne('levels');

        promise.then(() => {
            expect(req.request.method).toBe('POST');
        });

        req.flush({});

        return promise;
    });

    it('should update a level', () => {
        let promise = service.updateLevel({ id: 1, name: 'testname', decodedLayout: [[]]});
        let req = httpTestingController.expectOne('levels/1');

        promise.then(() => {
            expect(req.request.method).toBe('PUT');
        });

        req.flush({});

        return promise;
    });

    it('should remove a level', () => {
        let promise = service.removeLevel(1);
        let req = httpTestingController.expectOne('levels/1');

        promise.then(() => {
            expect(req.request.method).toBe('DELETE');
        });

        req.flush({});

        return promise;
    });
});
