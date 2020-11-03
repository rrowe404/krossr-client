import { LevelEditorFormService } from '../LevelEditorForm/LevelEditorFormService';
import { Injectable } from '@angular/core';

@Injectable()
export class MockLevelEditorFormService extends LevelEditorFormService {
    getOptions() {
        return Promise.resolve({ sizeOptions: {} });
    }
}
