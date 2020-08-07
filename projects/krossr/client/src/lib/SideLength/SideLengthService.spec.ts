import { SideLengthService } from "./SideLengthService";
import { async, TestBed } from '@angular/core/testing';

describe('SideLengthService', () => {
    let service: SideLengthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.inject(SideLengthService);
    });
    
    it ('should store a side length', () => {
        service.sideLength = 5;
        expect(service.sideLength).toBe(5);
    })
});