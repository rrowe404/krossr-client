import { CreateLevelBodyViewModel } from 'src/Level/Level';
import { LevelService } from '../Level/LevelService';
import { Injectable } from '@angular/core';

@Injectable()
export class MockLevelService extends LevelService {
    createLevel(params: CreateLevelBodyViewModel) {
        return ({ ...params, layout: '', size: 0 });
    }
}
