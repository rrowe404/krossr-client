import { Component, Input, OnInit } from '@angular/core';
import { LevelListLevelViewModel } from '@krossr/types';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { GameSize } from '../GameSize/GameSize';
import { ILevel } from '../Level/Level';
import { LevelDecoder } from '../LevelDecoder/LevelDecoder';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { TileSizeService } from '../TileSize/TileSizeService';

@Component({
    selector: 'krossr-complete-level-preview',
    styleUrls: ['../LevelPreview/LevelPreviewStyles.less'],
    templateUrl: 'CompleteLevelPreviewView.html'
})
export class CompleteLevelPreviewComponent implements OnInit {
    @Input() public level: ILevel;

    public gameSize: GameSize;
    public gameMatrix: GameMatrix;

    constructor(
        private levelDecoder: LevelDecoder,
        private tileSizeService: TileSizeService
    ) {
    }

    ngOnInit() {
        this.level.decodedLayout = this.levelDecoder.decodeLayout(this.level.layout);
        let layout = this.level.decodedLayout;
        let matrix = new BooleanMatrix(layout.length, layout.length);
        matrix.initializeWith(layout);
        this.gameMatrix = new GameMatrix(matrix, true);
        this.gameSize = { width: '100px', height: '100px' }; // todo fix magic;
        this.tileSizeService.setTileSize(100, layout.length);
    }
}
