import { PointService } from "./PointService";
import { TestBed } from '@angular/core/testing';
import { SideLengthService } from '../SideLength/SideLengthService';

describe('PointService', () => {
    let service: PointService;
    let sideLengthService: SideLengthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PointService);
        sideLengthService = TestBed.inject(SideLengthService);
    });

    it('should convert a Point to an index for a square game', () => {
        sideLengthService.sideLength = 5; // TODO

        let point = { x: 2, y: 2 };
        expect(service.pointToIndex(point)).toBe(12);
    });

    it('should convert an index to a Point for a square game', () => {
        sideLengthService.sideLength = 5; // TODO

        let index = 12;
        expect(service.indexToPoint(index)).toEqual({ x: 2, y: 2 });
    });
});