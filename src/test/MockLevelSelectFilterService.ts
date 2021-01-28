import { LevelSelectFilterService } from '../LevelSelectFilter/LevelSelectFilterService';
import { Injectable } from '@angular/core';
import { LevelListFilterSelectOptionsViewModel } from '@krossr/api';

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
