import { LevelService } from './LevelService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('LevelService', () => {
    let service: LevelService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(LevelService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
