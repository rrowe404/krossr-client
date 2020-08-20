import { Input, Output, OnInit, EventEmitter, Component } from '@angular/core';
import { ILevel } from '../Level/Level';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from '../Utils/Utils';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';
import { LevelService } from '../Level/LevelService';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';
import { StateService } from '@uirouter/core';
import { HomeRoutes } from '../Routing/RouteNames';
import { LevelEditorFormService } from './LevelEditorFormService';
import { LevelEditorSelectOptionsViewModel, Dictionary } from '@krossr/types';
import { LevelEditorFormClearEventService } from './LevelEditorFormClearEventService';
import { TileFillEventService } from '../Tile/TileFillEventService';
import { TileState } from '../Tile/TileState';

@Component({
    selector: 'krossr-level-editor-form',
    templateUrl: './LevelEditorFormView.html'
})
export class LevelEditorFormComponent implements OnInit {
    @Input() public level: ILevel;
    @Input() public error: string;
    @Input() public submitText: string;
    @Output() public sizeChange: EventEmitter<void> = new EventEmitter();
    @Output() public submitAction: EventEmitter<ILevel> = new EventEmitter();

    public isReady = false;

    public formGroup: FormGroup;
    public nameFormControl: FormControl;
    public sizeFormControl: FormControl;

    public sizeMap: Dictionary<number>;

    constructor(
        private levelService: LevelService,
        private levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelEditorFormService: LevelEditorFormService,
        private matDialog: MatDialog,
        private stateService: StateService,
        private tileFillEventService: TileFillEventService,
        private utils: Utils
    ) {
    }

    public clearAll() {
        this.levelEditorFormClearEventService.formClearEvent.emit();
        this.tileFillEventService.fill.emit({ initState: false, override: TileState.empty });
    }

    public confirmClear() {
        this.matDialog.open(ConfirmationComponent, {
            data: {
                submitText: 'Clear',
                submitAction: () => this.clearAll()
            } as ConfirmationOptions,
            disableClose: true
        });
    }

    public confirmRemove() {
        this.matDialog.open(ConfirmationComponent, {
            data: {
                submitText: 'Delete',
                submitAction: () => this.removeCurrentLevel()
            } as ConfirmationOptions,
            disableClose: true
        });
    }

    /** Remove the level you're looking at */
    removeCurrentLevel() {
        this.remove(this.level);
    }

    /** Remove any Level passed in */
    remove(level) {
        if (level) {
            this.levelService.removeLevel(level.id).then(() => {
                this.matDialog.open(LevelSelectComponent);
                this.stateService.go(HomeRoutes.home, {}, { reload: true });
            });
        }
    }

    public ngOnInit() {
        this.levelEditorFormService.getOptions().then(options => {
            this.setupOptions(options);
            this.formGroup = new FormGroup({});
            this.nameFormControl = new FormControl(this.level.name, [Validators.required]);
            this.sizeFormControl = new FormControl(this.level.size, [Validators.required]);

            this.formGroup.addControl('name', this.nameFormControl);
            this.isReady = true;
        });
    }

    public submit() {
        this.submitAction.emit(this.level);
    }

    public submitButtonText() {
        return this.error || this.submitText;
    }

    public updateName(name: string) {
        this.level.name = name;
    }

    public updateSize(selected: number) {
        let size = this.sizeMap[selected];
        this.level.size = size;
        this.sizeChange.emit();
    }

    private setupOptions(options: LevelEditorSelectOptionsViewModel) {
        this.sizeMap = options.sizeOptions;
    }
}
