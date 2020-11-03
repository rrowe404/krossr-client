import { Matrix } from './Matrix';

/**
 * The matrix implementation we'll use for the game functionality
 */
export class BooleanMatrix extends Matrix<boolean> {
    constructor(rowCount: number, colCount: number) {
        super(rowCount, colCount);

        // Initialize to false
        this.clear();
    }

    clear() {
        this.iterate((row, column) => {
            this.setValueAt(row, column, false);
        });
    }

    rotate() {
        let rotatedMatrix = super.rotate();
        let result = new BooleanMatrix(this.length, this.length); // assumes squareness, todo
        result.copyFrom(rotatedMatrix);
        return result;
    }
}
