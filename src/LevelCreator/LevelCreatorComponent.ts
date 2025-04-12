import { GameMatrix } from '../GameMatrix/GameMatrix';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { StateService } from '@uirouter/core';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { ResizeEventService } from '../Resize/ResizeEventService';
import { GameSizeService } from '../GameSize/GameSizeService';
import { CreateLevelBodyViewModel, ILevel } from '../Level/Level';
import { LevelEditorFormClearEventService } from '../LevelEditorForm/LevelEditorFormClearEventService';
import { LevelService } from '../Level/LevelService';
import { LevelComponentBase } from '../Level/LevelComponentBase';
import { nowAndLater } from '../Debounce/Debounce';
import { GoalMatrixFactory } from '../GoalMatrix/GoalMatrixFactory';
import { FormControl, FormGroup } from '@angular/forms';
import { AsyncContentComponent } from '../Async/AsyncContentComponent';
import { LevelEditorFormComponent } from '../LevelEditorForm/LevelEditorFormComponent';
import { KrossrInputComponent } from '../KrossrInput/KrossrInputComponent';
import { GameComponent } from '../Game/GameComponent';
import { LevelViewModel } from 'src/Level/Level';

@Component({
    selector: 'krossr-level-creator',
    templateUrl: './LevelCreatorView.html',
    imports: [AsyncContentComponent, NgIf, LevelEditorFormComponent, KrossrInputComponent, GameComponent]
})
export class LevelCreatorComponent extends LevelComponentBase implements OnInit, OnDestroy {
    constructor(
        private $state: StateService,
        protected gameSizeService: GameSizeService,
        protected goalMatrixFactory: GoalMatrixFactory,
        protected levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelService: LevelService,
        protected resizeEventService: ResizeEventService,
        protected tileSizeEventService: TileSizeEventService,
    ) {
        super(levelEditorFormClearEventService, gameSizeService, goalMatrixFactory, resizeEventService, tileSizeEventService);
    }

    public margin: string;
    public level: ILevel;
    public result: string;
    @Input() public levelId;

    public gameMatrix: GameMatrix;
    public goalMatrix: GameMatrix;
    public error: string;

    public formGroup: FormGroup;
    public resultFormControl: FormControl;

    async ngOnInit() {
        await super.ngOnInit();
        this.createNewLevel();

        this.formGroup = new FormGroup({});
        this.resultFormControl = new FormControl();
        this.resultFormControl.disable();
        this.formGroup.addControl('result', this.resultFormControl);
    }

    createGameArray() {
        let sideLength = this.level ? Math.sqrt(this.level.size) : 5;

        let game = this.createNewGame({
            layout: new BooleanMatrix(sideLength, sideLength).getLayout()
        });

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
            this.result = `${window.location.protocol}//${window.location.host}/level/${response.layout}`; // todo better
            this.resultFormControl.setValue(this.result);
        } catch (response) {
            let error = response.error as Error;
            nowAndLater(() => this.error = error.message, () => this.error = '');
        }
    }
}
