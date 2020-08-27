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

    it('should behave normally when shiftLock is off', () => {
        service.shiftLock = false;
        service.shiftOn = true;
        expect(service.shiftOn).toBeTrue();
        service.shiftOn = false;
        expect(service.shiftOn).toBeFalse();
    });

    it('should behave correctly when shiftLock is on', () => {
        service.shiftLock = true;
        service.shiftOn = true;
        expect(service.shiftOn).toBeTrue();
        service.shiftOn = false;
        expect(service.shiftOn).toBeTrue();
    });
});
