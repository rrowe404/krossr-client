import { Matrix } from "./Matrix";

describe('Matrix', () => {
    let matrix: Matrix<string>;

    beforeEach(() => {
        matrix = new Matrix<string>(2, 2);
    });

    it('should be created and be the correct length', () => {
        expect(matrix.length).toBe(2);
    });

    it('should be able to get and set values', () => {
        matrix.setValueAt(0, 0, 'h');
        expect(matrix.getValueAt(0, 0)).toBe('h');
    });

    it('should be able to be rotated 90 degrees', () => {
        matrix.setValueAt(0, 0, 'o');
        matrix.setValueAt(0, 1, 'h');
        let rotated = matrix.rotate();
        expect(rotated.getValueAt(0, 1)).toBe('o');
        expect(rotated.getValueAt(1, 1,)).toBe('h');
    });

    it('should be able to be flattened', () => {
        matrix.setValueAt(0, 0, 'o');
        matrix.setValueAt(0, 1, 'h');
        matrix.setValueAt(1, 0, 'i');
        matrix.setValueAt(1, 1, 'o');
        expect(matrix.flatten()).toEqual(['o', 'h', 'i', 'o']);
    });

    it('should be able to be iterated', () => {
        matrix.iterate((row, column) => {
            matrix.setValueAt(row, column, 'hi');
        });

        expect(matrix.getValueAt(0, 0)).toBe('hi');
        expect(matrix.getValueAt(0, 1)).toBe('hi');
        expect(matrix.getValueAt(1, 0)).toBe('hi');
        expect(matrix.getValueAt(1, 1)).toBe('hi');
    });

    it('should be able to be set and compared', () => {
        let values = [['o', 'h'], ['i', 'o']];
        let otherMatrix = new Matrix<string>(2, 2);
        
        matrix.initializeWith(values);
        otherMatrix.initializeWith(values);

        expect(matrix.equals(otherMatrix)).toBeTrue();

        let otherValues = [['f', 'o'], ['u', 'r']];
        let thirdMatrix = new Matrix<string>(2, 2);
        thirdMatrix.initializeWith(otherValues);

        matrix.copyFrom(thirdMatrix);

        expect(matrix.equals(otherMatrix)).toBeFalse();
        expect(matrix.equals(thirdMatrix)).toBeTrue();
    });

    it('should not leak when using copyFrom', () => {
        let otherMatrix = new Matrix<string>(2, 2);
        otherMatrix.copyFrom(matrix);
        otherMatrix.setValueAt(0, 0, 'oh');
        expect(matrix.getValueAt(0, 0)).toBeFalsy();
    });

    it('should have a working getLayout', () => {
        let layout = [['o', 'h'], ['i', 'o']];
        matrix.initializeWith(layout);
        expect(matrix.getLayout()).toEqual(layout);
    });

    it('should not leak when using getLayout', () => {
        let layout = matrix.getLayout();
        layout[0][0] = 'hi';
        expect(matrix.getValueAt(0, 0)).toBeFalsy();
    });
});