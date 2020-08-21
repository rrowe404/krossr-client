import { LevelService } from 'projects/krossr/client/src/lib/Level/LevelService';
import { CreateLevelBodyViewModel } from '@krossr/types';
import { Injectable } from '@angular/core';

@Injectable()
export class MockLevelService extends LevelService {
    createLevel(params: CreateLevelBodyViewModel) {
        return Promise.resolve({ id: 1 });
    }
}