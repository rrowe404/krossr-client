import { AuthenticationService } from '../Authentication/AuthenticationService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { Input, Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';
import { LevelRoutes } from '../Routing/RouteNames';
import { KrossrError, LevelViewModel, UpdateLevelBodyViewModel } from '@krossr/types';
import { LevelDecoder } from '../LevelDecoder/LevelDecoder';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { LevelService } from '../Level/LevelService';
import { LevelComponentBase } from '../Level/LevelComponentBase';
import { nowAndLater } from '../Debounce/Debounce';

@Component({
    selector: 'krossr-level-editor',
    templateUrl: './LevelEditorView.html'
})
export class LevelEditorComponent extends LevelComponentBase implements OnInit {
    constructor(
        private $state: StateService,
        public Authentication: AuthenticationService,
        protected gameSizeService: GameSizeService,
        private levelDecoder: LevelDecoder,
        protected levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelService: LevelService,
        private matDialog: MatDialog,
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

    confirmUpdate(level: UpdateLevelBodyViewModel) {
        this.matDialog.open(ConfirmationComponent, this.getConfirmUpdateOptions(level));
    }

    getConfirmUpdateOptions(level: UpdateLevelBodyViewModel) {
        return {
            data: {
                submitText: 'Update',
                submitAction: () => this.updateLevel(level)
            } as ConfirmationOptions,
            disableClose: true
        };
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

        let gameMatrix = game.goalMatrix;
        this.gameMatrix = new GameMatrix(gameMatrix, true);

        this.finalLayout = gameMatrix.flatten().map(this.toTileLayout);

        this.level.ready = true;
    }

    async updateLevel(level: UpdateLevelBodyViewModel) {
        level.decodedLayout = this.gameMatrix.horizontal.getLayout();

        try {
            await this.levelService.updateLevel(level);
            this.$state.go(LevelRoutes.update, { levelId: level.id }, { reload: true });
        } catch (err) {
            let response = err as KrossrError;
            nowAndLater(() => this.error = response.error.message, () => this.error = '');
        }
    }
}
