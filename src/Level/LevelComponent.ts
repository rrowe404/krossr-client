import { GameMatrix } from '../GameMatrix/GameMatrix';
import { LevelService } from './LevelService';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { Input, Component, OnInit } from '@angular/core';
import { LevelDecoder } from '../LevelDecoder/LevelDecoder';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { LevelComponentBase } from './LevelComponentBase';
import { GameOverService } from '../GameOver/GameOverService';
import { GoalMatrixFactory } from '../GoalMatrix/GoalMatrixFactory';
import { CompleteLevelService } from '../CompleteLevel/CompleteLevelService';
import { LevelViewModel } from '@krossr/api';

@Component({
    selector: 'krossr-level',
    styleUrls: ['./LevelStyles.less'],
    templateUrl: './LevelView.html'
})
export class LevelComponent extends LevelComponentBase implements OnInit {
    constructor(
        protected gameSizeService: GameSizeService,
        protected gameOverService: GameOverService,
        protected goalMatrixFactory: GoalMatrixFactory,
        private completeLevelService: CompleteLevelService,
        private levelDecoder: LevelDecoder,
        protected levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelService: LevelService,
        protected resizeEventService: ResizeEventService,
        protected tileSizeEventService: TileSizeEventService,
    ) {
        super(levelEditorFormClearEventService, gameSizeService, goalMatrixFactory, resizeEventService, tileSizeEventService);
    }

    @Input() public levelLayout: string;

    async ngOnInit() {
        await super.ngOnInit();
        await this.findOne();
    }

    async findOne() {
        this.level = null;

        let data = await this.levelService.getLevel(this.levelLayout) as LevelViewModel;

        this.level = Object.assign({}, data, { ready: false });

        this.level.decodedLayout = this.levelDecoder.decodeLayout(data.layout);

        let game = this.createNewGame({
            layout: this.level.decodedLayout
        });

        this.gameMatrix = new GameMatrix(game.gameMatrix, false);

        let goalLayout = game.goalMatrix;

        if (goalLayout) {
            this.goalMatrix = new GameMatrix(goalLayout, true);
        }

        this.isReady = true;
    }

    checkForWin() {
        let win = this.gameMatrix && this.gameMatrix.equals(this.goalMatrix);

        if (win) {
            this.gameOverService.openDialog();
            this.completeLevelService.completeLevel({ levelLayout: this.level.layout });
        }

        return win;
    }
}
