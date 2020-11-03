import { ShiftService } from './ShiftService';
import { TestBed } from '@angular/core/testing';

describe('ShiftService', () => {
    let service: ShiftService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShiftService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should behave correctly', () => {
        service.shiftOn = true;
        expect(service.shiftOn).toBeTrue();
        service.shiftOn = false;
        expect(service.shiftOn).toBeFalse();
    });
});
