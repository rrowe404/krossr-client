import { TestBed } from "@angular/core/testing";
import { DragBoxService } from './DragBoxService';
import { Point } from '../Point/Point';

describe('DragBoxService', () => {
    let service: DragBoxService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DragBoxService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('should provide a proper result for', () => {
        it('no drag', () => {
            let result = service.process();
            expect(result).toEqual([]);
        });

        describe('a top-left origin drag', () => {
            it('ending on the same column', () => {
                let startCoord: Point = { x: 0, y: 0 };
                let endCoord: Point = { x: 0, y: 4 };

                service.startCoord = startCoord;
                service.endCoord = endCoord;

                let result = service.process();

                expect(result).toEqual([
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 0, y: 3 },
                    { x: 0, y: 4 },
                ]);
            });
        });

        describe('a bottom-right origin drag', () => {
            it('ending on the same column', () => {
                let startCoord: Point = { x: 0, y: 4 };
                let endCoord: Point = { x: 0, y: 0 };

                service.startCoord = startCoord;
                service.endCoord = endCoord;

                let result = service.process();

                expect(result).toEqual([
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 0, y: 3 },
                    { x: 0, y: 4 },
                ]);
            });

            it('ending on the same row', () => {
                let startCoord: Point = { x: 4, y: 0 };
                let endCoord: Point = { x: 0, y: 0 };

                service.startCoord = startCoord;
                service.endCoord = endCoord;

                let result = service.process();

                expect(result).toEqual([
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                    { x: 3, y: 0 },
                    { x: 4, y: 0 },
                ]);
            });
        });
    });

    it('should get and set initState', () => {
        service.initState = true;
        expect(service.initState).toBeTrue();
    });

    it('should validate start', () => {
        expect(service.validateStart()).toBeFalsy();
        let start = { x: 0, y: 0 };
        service.startCoord = start;
        expect(service.validateStart()).toBe(start);
    });
});
