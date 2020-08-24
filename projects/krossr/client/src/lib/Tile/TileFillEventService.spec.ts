import { TileFillEventService } from './TileFillEventService';
import { TestBed } from '@angular/core/testing';

describe('TileFillEventService', () => {
    let service: TileFillEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TileFillEventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should provide a clearAll fn', () => {
        spyOn(service.fill, 'emit');
        service.clearAll();

        expect(service.fill.emit).toHaveBeenCalled();
    });
});
