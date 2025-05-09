import { LevelListFilterSelectOptionsViewModel } from 'src/Level/Level';
import { LevelSelectFilterService } from '../LevelSelectFilter/LevelSelectFilterService';
import { Injectable } from '@angular/core';

@Injectable()
export class MockLevelSelectFilterService extends LevelSelectFilterService {
    getOptions(): Promise<LevelListFilterSelectOptionsViewModel> {
        return Promise.resolve({
            sortByOptions: {
                Fake: 'fake'
            },
            sizeOptions: {
                '5x5': 25
            },
            sortDirectionOptions: {
                Ascending: 'ASC'
            }
        });
    }
}
