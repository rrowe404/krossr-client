import { LevelService } from './LevelService';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';

describe('LevelService', () => {
    let service: LevelService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LevelService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // it('should create a level', async () => {
    //     let promise = service.createLevel({ name: 'testname', decodedLayout: [[]] });
    //     let req = httpTestingController.expectOne('/levels');

    //     req.flush({});

    //     await promise;
    //     expect(req.request.method).toBe('POST');
    // });
});
