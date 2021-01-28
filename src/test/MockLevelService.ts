import { LevelService } from '../Level/LevelService';
import { CreateLevelBodyViewModel } from '@krossr/types';
import { Injectable } from '@angular/core';

@Injectable()
export class MockLevelService extends LevelService {
    createLevel(params: CreateLevelBodyViewModel) {
        return Promise.resolve({ ...params, layout: '', size: 0 });
    }
}
