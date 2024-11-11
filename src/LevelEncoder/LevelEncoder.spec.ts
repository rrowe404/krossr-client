import { TestBed } from "@angular/core/testing";
import { LevelEncoder } from "./LevelEncoder"

describe('LevelEncoder', () => {
    let encoder: LevelEncoder;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        encoder = TestBed.inject(LevelEncoder);
    });

    it('should encode a level', () => {
        let result = encoder.encodeLayout([
            [true, false, false, false, true],
            [true, false, false, false, true],
            [true, false, false, false, true],
            [true, false, false, false, true],
            [true, true, true, true, true]
        ]);

        expect(result).toEqual('MTAwMDExMDAwMTEwMDAxMTAwMDExMTExMQ==');
    });
})