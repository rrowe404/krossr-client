import { TestBed } from '@angular/core/testing';
import { TouchService } from './TouchService';

describe('TouchService', () => {
    let service: TouchService;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.inject(TouchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
