import { BooleanMatrix } from "./BooleanMatrix";

describe('BooleanMatrix', () => {
    it('should initialize to false', () => {
        let matrix = new BooleanMatrix(2, 2);
        expect(matrix.getValueAt(0, 0)).toBeFalse();
    });
});