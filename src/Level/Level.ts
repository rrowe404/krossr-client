import { LevelViewModel } from "@krossr/api";

export interface ILevel extends LevelViewModel {
    decodedLayout?: boolean[][];
    size: number;
}
