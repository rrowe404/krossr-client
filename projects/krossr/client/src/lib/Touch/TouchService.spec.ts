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

    it('should get touches', () => {
        let event = new MouseEvent('mousemove', {});
        expect(service.getTouches(event)).toEqual([ undefined ]);

        let touches = [new Touch({ identifier: 0, target: document})];

        let event2 = new TouchEvent('touchmove', { touches });
        expect(service.getTouches(event2)[0]).toEqual(touches[0]);

        let fakeEvent = {
            originalEvent: {
                touches
            }
        };

        expect(service.getTouches(fakeEvent)[0]).toEqual(touches[0]);

        let fakeEvent2 = {
            originalEvent: {
                changedTouches: touches
            }
        };

        expect(service.getTouches(fakeEvent2)[0]).toEqual(touches[0]);

        let fakeEvent3 = {
            originalEvent: {}
        };

        expect(service.getTouches(fakeEvent3)).toEqual([{}]);
    });

    it('should get real target', () => {
        let touches = [new Touch({ identifier: 0, target: document})];

        let event = new TouchEvent('touchmove', { touches });

        expect(service.getRealTarget(event)).toBe(document.elementFromPoint(0, 0));
    });
});
