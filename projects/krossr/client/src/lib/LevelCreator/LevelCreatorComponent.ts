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
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { LevelService } from '../Level/LevelService';
import { LevelComponentBase } from '../Level/LevelComponentBase';
import { TileLayout } from '../TileLayout/TileLayout';
import { nowAndLater } from '../Debounce/Debounce';

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

    public finalLayout: Array<TileLayout> = [];
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

        this.finalLayout = game.gameMatrix.flatten().map(this.toTileLayout);

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
            name,
            size: 25
        };

        this.isReady = true;
    }

    // Split out for easier testing
    async submitCreate() {
        // Create new Level object
        let level = {
            name: this.level.name,
            decodedLayout: this.gameMatrix.horizontal.getLayout(),
        } as CreateLevelBodyViewModel;

        try {
            let response = await this.levelService.createLevel(level) as LevelViewModel;
            this.$state.go(LevelRoutes.update, { levelId: response.id }, { reload: true });
        } catch(err) {
            let reponse = err as KrossrError;
            nowAndLater(() => this.error = reponse.error.message, () => this.error = '');
        }
    }
}
