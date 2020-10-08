import { LevelViewModel } from '@krossr/types';

export interface ILevel extends LevelViewModel {
    decodedLayout?: boolean[][];
    size: number;
}
