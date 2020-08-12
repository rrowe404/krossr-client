import { TileBorderService } from './TileBorderService';
import { TestBed } from '@angular/core/testing';
import { Point } from '../Point/Point';
import { Position } from '../Position/Position';

describe('TileBorderService', () => {
    let service: TileBorderService;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.inject(TileBorderService);
    });

    it('should not apply borders to small puzzles', () => {
        let result = service.getBorder('left', { x: 5, y: 5 }, 5);
        expect(result).toBeFalsy();
    });

    it('should apply borders to medium-large puzzles appropriately', () => {
        let directions = ['left', 'right', 'bottom', 'top'];
        let isClean = (position: Point, length: number) => {
            return directions.every((direction: Position) => !service.getBorder(direction, position, length) );
        };

        expect(isClean({ x: 0, y: 0 }, 10)).toBeTrue();
        expect(isClean({ x: 0, y: 4 }, 10)).toBeFalsy();

        // centers of a 10x10
        expect(service.getBorder('bottom', { x: 4, y: 4 }, 10)).toBeTruthy();
        expect(service.getBorder('right', { x: 4, y: 4 }, 10)).toBeTruthy();

        expect(service.getBorder('bottom', { x: 5, y: 4 }, 10)).toBeTruthy();
        expect(service.getBorder('left', { x: 5, y: 4 }, 10)).toBeTruthy();

        expect(service.getBorder('top', { x: 4, y: 5 }, 10)).toBeTruthy();
        expect(service.getBorder('right', { x: 4, y: 5 }, 10)).toBeTruthy();

        expect(service.getBorder('top', { x: 5, y: 5 }, 10)).toBeTruthy();
        expect(service.getBorder('left', { x: 5, y: 5 }, 10)).toBeTruthy();
        //

        // 15x15 extension
        expect(service.getBorder('bottom', { x: 9, y: 4 }, 10)).toBeTruthy();

        // difference between the same position on 10x10 to 15x15
        expect(service.getBorder('right', { x: 9, y: 4 }, 10)).toBeFalsy();
        expect(service.getBorder('right', { x: 9, y: 4 }, 15)).toBeTruthy();
    });

    it('should output nothing if the direction is invalid', () => {
        expect(service.getBorder('kalamazoo' as any, { x: 0, y: 0 }, 10)).toBeFalsy();
    });
});
