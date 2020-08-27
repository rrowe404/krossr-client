import { LevelViewModel } from '@krossr/types';

export interface ILevel extends LevelViewModel {
    ready: boolean;
    decodedLayout?: boolean[][];
    size: number;
}
