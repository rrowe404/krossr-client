import { AuthenticationService } from '../Authentication/AuthenticationService';
import { ILevel } from './Level';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelService } from './LevelService';
import { ShiftService } from '../Shift/ShiftService';
import { Utils } from '../Utils/Utils';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { RatingService } from '../Rating/RatingService';
import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '@uirouter/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';
import { Subscription } from 'rxjs';
import { LevelRoutes } from '../Routing/RouteNames';
import { LevelLayout } from './LevelLayout';
import { KrossrError, LevelViewModel, CreateLevelBodyViewModel, UpdateLevelBodyViewModel } from '@krossr/types';
import { LevelDecoder } from '../LevelDecoder/LevelDecoder';
import { BooleanMatrix } from '../Matrix/BooleanMatrix';

@Component({
    selector: 'krossr-level',
    styleUrls: ['./LevelStyles.less'],
    templateUrl: './LevelView.html'
})
export class LevelComponent implements OnInit, OnDestroy {
    constructor(
        private $state: StateService,
        public Authentication: AuthenticationService,
        private levelDecoder: LevelDecoder,
        private levelService: LevelService,
        private matDialog: MatDialog,
        private ratingService: RatingService,
        private shiftService: ShiftService,
        private tileSizeEventService: TileSizeEventService,
        private utils: Utils
    ) {
    }

    public finalLayout: LevelLayout = {};
    @Input() public mode: string; // string for edit, new, etc.
    public margin: string;
    public level: ILevel;
    @Input() public levelId;

    public gameMatrix: GameMatrix;
    public goalMatrix: GameMatrix;
    public error: string;

    private selectedLevelId;
    private timeout = 1000;
    private subscriptions: Subscription[];

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
        this.selectedLevelId = this.levelId;
        this.findOne(this.mode);

        this.subscriptions = [
            this.tileSizeEventService.tileSizeChanged.subscribe(tileSize => {
                let newSize = Math.floor(tileSize);
                this.margin = newSize / 2 + 'px';
            })
        ];
    }

    confirmUpdate(level: UpdateLevelBodyViewModel) {
        this.matDialog.open(ConfirmationComponent, {
            data: {
                submitText: 'Update',
                submitAction: () => this.updateLevel(level)
            } as ConfirmationOptions,
            disableClose: true
        });
    }

    createGameArray() {
        let sideLength = this.level ? Math.sqrt(this.level.size) : 5;

        this.utils.createNewGame({
            controller: 'new',
            layout: new BooleanMatrix(sideLength, sideLength).getLayout()
        });

        this.getLayoutForRepeater('new');
    }

    // Create new level (load template)
    createNewLevel() {
        let name = '';

        if (this.level) {
            name = this.level.name;
        }

        this.utils.clearAll();

        this.level = undefined;

        this.createGameArray();

        this.level = {
            currentView: 'new',
            layout: '',
            ready: true,
            name,
            size: 25
        };

        this.gameMatrix = new GameMatrix(this.utils.getGameMatrix(), false);
    }

    // Find existing Level
    findOne(mode) {
        this.finalLayout = {};
        this.level = null;

        // store the name of the controller so we can have the same functions do different things
        // depending on new, edit, etc.
        this.mode = mode;

        if (!this.selectedLevelId) {
            this.createNewLevel();
        }

        this.levelService.getLevel(this.selectedLevelId).then((data: LevelViewModel) => {
            this.level = Object.assign({}, data, { currentView: mode, ready: false });

            this.level.decodedLayout = this.levelDecoder.decodeLayout(data.layout);

            this.utils.createNewGame({
                layout: this.level.decodedLayout,
                controller: mode
            });

            this.gameMatrix = new GameMatrix(this.utils.getGameMatrix(), mode === 'edit');

            let goalLayout = this.utils.getGoalMatrix();

            if (goalLayout) {
                this.goalMatrix = new GameMatrix(goalLayout, true);
            }

            this.getLayoutForRepeater(mode, this.level.decodedLayout);
            this.level.currentView = mode;

            this.level.ready = true;
        });
    }

    getLayoutForRepeater(mode, layout?) {
        // use finalLayout from above to prevent calculating this more than once
        let layoutForRepeater;

        switch (mode) {
            case 'view':
            case 'edit':
                layoutForRepeater = this.utils.flatten(layout);
                break;

            case 'new':
                layoutForRepeater = this.getSize();
                break;
        }

        // these should be an object so i don't have to track by $index, which causes rendering issues
        this.finalLayout.tiles = layoutForRepeater.map((value) => {
            return {
                selected: value
            };
        });
    }

    getSize() {
        let gameMatrix = this.utils.getGameMatrix();
        return gameMatrix.flatten();
    }

    keydown($event: KeyboardEvent) {
        if ($event.shiftKey) {
            this.shiftService.shiftOn = true;
        }
    }

    keyup($event: KeyboardEvent) {
        if (!$event.shiftKey) {
            this.shiftService.shiftOn = false;
        }
    }

    rate(rating) {
        setTimeout(() => {
            this.ratingService.rate(this.level.id, rating);
        });
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

    updateLevel(level: UpdateLevelBodyViewModel) {
        this.levelService.updateLevel(level).then(() => {
            this.$state.go(LevelRoutes.update, { levelId: level.id }, { reload: true });
        }).catch((response: KrossrError) => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        });
    }
}
