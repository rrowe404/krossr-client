import { AuthenticationService } from '../Authentication/AuthenticationService';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { Input, Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';
import { LevelRoutes } from '../Routing/RouteNames';
import { LevelDecoder } from '../LevelDecoder/LevelDecoder';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { LevelService } from '../Level/LevelService';
import { LevelComponentBase } from '../Level/LevelComponentBase';
import { nowAndLater } from '../Debounce/Debounce';
import { GoalMatrixFactory } from '../GoalMatrix/GoalMatrixFactory';
import { KrossrDialogService } from 'src/KrossrDialog/KrossrDialogService';
import { ErrorResponse, LevelViewModel, UpdateLevelBodyViewModel } from '@krossr/api';

@Component({
    selector: 'krossr-level-editor',
    templateUrl: './LevelEditorView.html'
})
export class LevelEditorComponent extends LevelComponentBase implements OnInit {
    constructor(
        private $state: StateService,
        public Authentication: AuthenticationService,
        protected gameSizeService: GameSizeService,
        protected goalMatrixFactory: GoalMatrixFactory,
        private levelDecoder: LevelDecoder,
        protected levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelService: LevelService,
        private dialogService: KrossrDialogService,
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

    confirmUpdate(level: UpdateLevelBodyViewModel) {
        this.dialogService.open(ConfirmationComponent, this.getConfirmUpdateOptions(level));
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
        this.level = null;


        let data = await this.levelService.getLevel(this.levelId) as LevelViewModel;
        this.level = Object.assign({}, data, { ready: false });

        this.level.decodedLayout = this.levelDecoder.decodeLayout(data.layout);

        let game = this.createNewGame({
            layout: this.level.decodedLayout
        });

        let gameMatrix = game.goalMatrix;
        this.gameMatrix = new GameMatrix(gameMatrix, true);

        this.isReady = true;
    }

    async updateLevel(level: UpdateLevelBodyViewModel) {
        level.decodedLayout = this.gameMatrix.horizontal.getLayout();

        try {
            await this.levelService.updateLevel(level);
            this.$state.go(LevelRoutes.update, { levelId: level.id }, { reload: true });
        } catch (response) {
            let error = response.error as ErrorResponse;
            nowAndLater(() => this.error = error.message, () => this.error = '');
        }
    }
}
