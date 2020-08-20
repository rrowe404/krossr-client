import { LevelViewModel } from '@krossr/types';

export interface ILevel extends LevelViewModel {
    currentView?: 'edit' | 'new' | 'view';
    ready: boolean;
    decodedLayout?: boolean[][];
    size: number;
}
