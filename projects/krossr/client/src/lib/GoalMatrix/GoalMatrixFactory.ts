import { Injectable } from '@angular/core';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';

@Injectable({
    providedIn: 'root'
})
export class GoalMatrixFactory {
    create(layout: boolean[][]) {
        let result: BooleanMatrix;
        result = new BooleanMatrix(layout.length, layout.length);
        result.initializeWith(layout);
        return result;
    }
}
