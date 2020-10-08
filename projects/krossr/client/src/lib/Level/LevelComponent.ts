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

@Component({
    selector: 'krossr-level',
    styleUrls: ['./LevelStyles.less'],
    templateUrl: './LevelView.html'
})
export class LevelComponent extends LevelComponentBase implements OnInit {
    constructor(
        public Authentication: AuthenticationService,
        protected gameSizeService: GameSizeService,
        private levelDecoder: LevelDecoder,
        protected levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelService: LevelService,
        private ratingService: RatingService,
        protected resizeEventService: ResizeEventService,
        protected tileSizeEventService: TileSizeEventService,
    ) {
        super(levelEditorFormClearEventService, gameSizeService, resizeEventService, tileSizeEventService);
    }

    @Input() public levelId;

    ngOnInit() {
        this.findOne();
        return super.ngOnInit();
    }

    async findOne() {
        this.finalLayout = [];
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

        this.finalLayout = game.gameMatrix.flatten().map(this.toTileLayout);

        this.level.ready = true;
    }

    rate(rating) {
        setTimeout(() => {
            this.ratingService.rate(this.level.id, rating);
        });
    }
}
