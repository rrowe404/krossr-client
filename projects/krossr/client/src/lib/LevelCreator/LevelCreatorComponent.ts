import { AuthenticationService } from '../Authentication/AuthenticationService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '@uirouter/core';
import { LevelRoutes } from '../Routing/RouteNames';
import { KrossrError, LevelViewModel, CreateLevelBodyViewModel, UpdateLevelBodyViewModel } from '@krossr/types';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { ILevel } from '../Level/Level';
import { LevelLayout } from '../Level/LevelLayout';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { LevelService } from '../Level/LevelService';
import { LevelComponentBase } from '../Level/LevelComponentBase';

@Component({
    selector: 'krossr-level-creator',
    templateUrl: './LevelCreatorView.html'
})
export class LevelCreatorComponent extends LevelComponentBase implements OnInit, OnDestroy {
    constructor(
        private $state: StateService,
        public Authentication: AuthenticationService,
        protected gameSizeService: GameSizeService,
        protected levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelService: LevelService,
        protected resizeEventService: ResizeEventService,
        protected tileSizeEventService: TileSizeEventService,
    ) {
        super(levelEditorFormClearEventService, gameSizeService, resizeEventService, tileSizeEventService);
    }

    public finalLayout: LevelLayout = {};
    public margin: string;
    public level: ILevel;
    @Input() public levelId;

    public gameMatrix: GameMatrix;
    public goalMatrix: GameMatrix;
    public error: string;

    ngOnInit() {
        this.createNewLevel();
        return super.ngOnInit();
    }

    createGameArray() {
        let sideLength = this.level ? Math.sqrt(this.level.size) : 5;

        let game = this.createNewGame({
            layout: new BooleanMatrix(sideLength, sideLength).getLayout()
        });

        this.finalLayout.tiles = game.gameMatrix.flatten().map(this.toTileLayout);

        this.gameMatrix = new GameMatrix(game.gameMatrix, false);

        return game;
    }

    // Create new level (load template)
    createNewLevel() {
        let name = '';

        if (this.level) {
            name = this.level.name;
        }

        this.level = undefined;

        this.createGameArray();

        this.level = {
            layout: '',
            ready: true,
            name,
            size: 25
        };
    }

    // Split out for easier testing
    submitCreate() {
        // Create new Level object
        let level = {
            name: this.level.name,
            decodedLayout: this.gameMatrix.horizontal.getLayout(),
        } as CreateLevelBodyViewModel;

        this.levelService.createLevel(level).then((response: LevelViewModel) => {
            this.$state.go(LevelRoutes.update, { levelId: response.id }, { reload: true });
        }).catch((response: KrossrError) => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = '';
            }, this.timeout);
        });
    }
}
