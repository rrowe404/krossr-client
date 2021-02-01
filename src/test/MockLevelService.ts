import { LevelService } from '../Level/LevelService';
import { Injectable } from '@angular/core';
import { CreateLevelBodyViewModel } from '@krossr/api';

@Injectable()
export class MockLevelService extends LevelService {
    createLevel(params: CreateLevelBodyViewModel) {
        return Promise.resolve({ ...params, layout: '', size: 0 });
    }
}
