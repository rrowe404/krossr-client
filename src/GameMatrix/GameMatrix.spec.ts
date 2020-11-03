import { GameMatrix } from './GameMatrix';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';

describe('GameMatrix', () => {
    let gameMatrix: GameMatrix;

    beforeEach(() => {
        gameMatrix = new GameMatrix(new BooleanMatrix(2, 2), true);
    });

    it('should be created', () => {
        expect(gameMatrix).toBeTruthy();
    });

    it('should have the correct length', () => {
        expect(gameMatrix.length).toBe(2);
    });

    it('should clear both matrices', () => {
        gameMatrix.setValueAt(0, 0, true);
        gameMatrix.clear();
        expect(gameMatrix.horizontal.getValueAt(0, 0)).toBeFalsy();
        expect(gameMatrix.vertical.getValueAt(0, 1)).toBeFalsy();
    });

    it('should be able to be compared', () => {
        let otherGameMatrix = new GameMatrix(new BooleanMatrix(2, 2), false);
        expect(gameMatrix.equals(otherGameMatrix)).toBeTrue();
    });

    it('should appropriately set both horizontal and vertical matrices when setValueAt is called', () => {
        gameMatrix.setValueAt(0, 0, true);
        expect(gameMatrix.horizontal.getValueAt(0, 0)).toBeTrue();
        expect(gameMatrix.vertical.getValueAt(0, 1)).toBeTrue();
    });
});
