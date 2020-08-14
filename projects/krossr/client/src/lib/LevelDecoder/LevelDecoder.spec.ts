import { LevelDecoder } from "./LevelDecoder";
import { TestBed } from '@angular/core/testing';

describe('LevelDecoder', () => {
    let decoder: LevelDecoder;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        decoder = TestBed.inject(LevelDecoder);
    });

    it('should decode a level', () => {
        let result = decoder.decodeLayout('MTAwMDExMDAwMTEwMDAxMTAwMDExMTExMQ==');

        expect(result).toEqual([
            [true, false, false, false, true],
            [true, false, false, false, true],
            [true, false, false, false, true],
            [true, false, false, false, true],
            [true, true, true, true, true]
        ]);
    });
});
