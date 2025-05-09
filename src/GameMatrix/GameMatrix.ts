import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { IEquatable } from '../Equatable/IEquatable';

export class GameMatrix implements IEquatable<GameMatrix> {
    public horizontal: BooleanMatrix;
    public vertical: BooleanMatrix;

    constructor(layout: BooleanMatrix, initialize: boolean) {
        this.horizontal = new BooleanMatrix(layout.length, layout.length);

        if (initialize) {
            this.horizontal.copyFrom(layout);
        }

        this.vertical = this.horizontal.rotate();
    }

    // assumes squareness, bad todo
    get length() {
        return this.horizontal.length;
    }

    public clear() {
        this.horizontal.clear();
        this.vertical.clear();
    }

    public equals(other: GameMatrix) {
        if (!other) {
            return false;
        }

        return this.horizontal.equals(other.horizontal);
    }

    public setValueAt(row: number, column: number, value: boolean) {
        this.horizontal.setValueAt(row, column, value);
        this.vertical = this.horizontal.rotate();
    }

    public toTileLayout() {
        return this.horizontal.flatten().map((value: boolean) => {
            return { selected: value  };
        });
    }
}
