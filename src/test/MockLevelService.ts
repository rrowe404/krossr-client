import { LevelService } from '../Level/LevelService';
import { Injectable } from '@angular/core';
import { CreateLevelBodyViewModel, LevelViewModel } from '@krossr/api';

@Injectable()
export class MockLevelService extends LevelService {
    createLevel(params: CreateLevelBodyViewModel) {
        return ({ ...params, layout: '', size: 0 });
    }
}
