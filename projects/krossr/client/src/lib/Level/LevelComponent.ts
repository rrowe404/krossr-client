import { AuthenticationService } from '../Authentication/AuthenticationService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { LevelService } from './LevelService';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { RatingService } from '../Rating/RatingService';
import { Input, Component, OnInit } from '@angular/core';
import { LevelViewModel } from '@krossr/types';
import { LevelDecoder } from '../LevelDecoder/LevelDecoder';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { LevelComponentBase } from './LevelComponentBase';
import { GameOverService } from '../GameOver/GameOverService';
import { GoalMatrixFactory } from '../GoalMatrix/GoalMatrixFactory';
import { CompleteLevelService } from '../CompleteLevel/CompleteLevelService';

@Component({
    selector: 'krossr-level',
    styleUrls: ['./LevelStyles.less'],
    templateUrl: './LevelView.html'
})
export class LevelComponent extends LevelComponentBase implements OnInit {
    constructor(
        public Authentication: AuthenticationService,
        protected gameSizeService: GameSizeService,
        protected gameOverService: GameOverService,
        protected goalMatrixFactory: GoalMatrixFactory,
        private completeLevelService: CompleteLevelService,
        private levelDecoder: LevelDecoder,
        protected levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelService: LevelService,
        private ratingService: RatingService,
        protected resizeEventService: ResizeEventService,
        protected tileSizeEventService: TileSizeEventService,
    ) {
        super(levelEditorFormClearEventService, gameSizeService, goalMatrixFactory, resizeEventService, tileSizeEventService);
    }

    @Input() public levelId;

    ngOnInit() {
        this.findOne();
        return super.ngOnInit();
    }

    async findOne() {
        this.level = null;

        let data = await this.levelService.getLevel(this.levelId) as LevelViewModel;

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
            this.gameOverService.openDialog(this.level);

            if (this.Authentication && this.Authentication.user) {
                this.completeLevelService.completeLevel({
                    userId: this.Authentication.user.id,
                    levelId: this.level.id
                });
            }
        }

        return win;
    }

    rate(rating) {
        setTimeout(() => {
            this.ratingService.rate(this.level.id, rating);
        });
    }
}
