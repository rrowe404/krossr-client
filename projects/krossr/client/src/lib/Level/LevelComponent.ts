import { AuthenticationService } from '../Authentication/AuthenticationService';
import { ILevel } from '../level/Level';
import { GameMatrix } from '../GameMatrix/GameMatrix';
import { GameSizeService } from '../GameSize/GameSizeService';
import { LevelService } from './LevelService';
import { ShiftService } from '../Shift/ShiftService';
import { Utils } from '../Utils/Utils';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { RatingService } from '../Rating/RatingService';
import { LevelParams } from './LevelParams';
import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '@uirouter/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';
import { Subscription } from 'rxjs';
import { LevelRoutes } from '../Routing/RouteNames';

@Component({
    selector: 'level',
    styleUrls: ['./LevelStyles.less'],
    templateUrl: './LevelView.html'
})
export class LevelComponent implements OnInit, OnDestroy {
    constructor(
        private $state: StateService,
        public Authentication: AuthenticationService,
        private gameSizeService: GameSizeService,
        private levelService: LevelService,
        private matDialog: MatDialog,
        private ratingService: RatingService,
        private shiftService: ShiftService,
        private tileSizeEventService: TileSizeEventService,
        private Utils: Utils
    ) {
    }

    public finalLayout: any = {};
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

    confirmUpdate(level: ILevel) {
        this.matDialog.open(ConfirmationComponent, {
            data: {
                submitText: 'Update',
                submitAction: () => this.updateLevel(level)
            } as ConfirmationOptions,
            disableClose: true
        });
    }

    createGameArray(action: string) {
        this.Utils.createNewGame({
            numberOfTiles: this.level ? this.level.size : 25,
            controller: this.level ? this.level.currentView : 'new'
        });

        this.getLayoutForRepeater(action);
    }

    // Create new level (load template)
    createNewLevel() {
        let action: 'new' = 'new';
        let name = '';

        if (this.level) {
            name = this.level.name;
        }

        this.Utils.clearAll();

        this.level = undefined;

        this.createGameArray(action);

        this.level = {
            currentView: action,
            ready: true,
            name,
            size: 25
        };

        this.gameMatrix = new GameMatrix(this.Utils.getGameMatrix(), false);
    }

    // Find existing Level
    findOne(mode) {
        this.finalLayout = {};
        this.level = null;

        // store the name of the controller so we can have the same functions do different things
        // depending on new, edit, etc.
        this.mode = mode;

        if (this.selectedLevelId) {
            this.levelService.getLevel(this.selectedLevelId).then((data: ILevel) => {
                this.level = data;

                this.setRating();

                this.level.layout = this.levelService.decodeLayout(data.layout);

                let flatLayout = this.Utils.flatten(this.level.layout);

                this.gameSizeService.calculatePlayableArea();

                this.Utils.createNewGame({
                    numberOfTiles: flatLayout.length,
                    layout: this.level.layout,
                    controller: mode
                });

                this.gameMatrix = new GameMatrix(this.Utils.getGameMatrix(), mode === 'edit');

                let goalLayout = this.Utils.getGoalMatrix();

                if (goalLayout) {
                    this.goalMatrix = new GameMatrix(goalLayout, true);
                }

                this.getLayoutForRepeater(mode, this.level.layout);
                this.level.currentView = mode;

                this.level.ready = true;
            });
        } else {
            this.createNewLevel();
        }
    }

    getLayoutForRepeater(mode, layout?) {
        // use finalLayout from above to prevent calculating this more than once
        let layoutForRepeater;

        switch (mode) {
            case 'view':
            case 'edit':
                layoutForRepeater = this.Utils.flatten(layout);
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
        let gameMatrix = this.Utils.getGameMatrix();
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


    /** This should be done on the server side, todo */
    setRating() {
        if (this.level.ratings && this.level.ratings.length) {
            this.level.yourRating = this.level.ratings[0].rating;
        }
    }

    // Split out for easier testing
    submitCreate() {
        // Create new Level object
        let level = {
            name: this.level.name,
            layout: this.gameMatrix.horizontal.getLayout(),
            size: this.gameMatrix.horizontal.length
        } as LevelParams;

        // Redirect after save TODO
        this.levelService.createLevel(level).then((response: any) => {
            this.$state.go(LevelRoutes.update, { levelId: response.id }, { reload: true });
        }).catch(response => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = '';
            }, this.timeout);
        });
    }

    updateLevel(level) {
        level.size = level.layout.length;

        this.levelService.updateLevel(level).then(() => {
            this.$state.go(LevelRoutes.update, { levelId: level.id }, { reload: true });
        }).catch(response => {
            this.error = response.error.message;

            setTimeout(() => {
                this.error = null;
            }, this.timeout);
        });
    }
}
