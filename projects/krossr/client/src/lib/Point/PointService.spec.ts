import { PointService } from './PointService';
import { TestBed } from '@angular/core/testing';

describe('PointService', () => {
    let service: PointService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PointService);
    });

    it('should convert an index to a Point for a square game', () => {
        let index = 12;
        expect(service.indexToPoint(index, 5)).toEqual({ x: 2, y: 2 });
    });
});
