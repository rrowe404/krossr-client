import { Input, Output, OnInit, EventEmitter, Component } from '@angular/core';
import { ILevel } from '../Level/Level';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';
import { LevelService } from '../Level/LevelService';
import { StateService } from '@uirouter/core';
import { LevelEditorFormService } from './LevelEditorFormService';
import { LevelEditorSelectOptionsViewModel, Dictionary } from '@krossr/types';
import { LevelEditorFormClearEventService } from './LevelEditorFormClearEventService';
import { TileFillEventService } from '../Tile/TileFillEventService';
import { TileState } from '../Tile/TileState';
import { AsyncLoadedComponent } from '../Async/AsyncLoadedComponent';
import { LevelRoutes } from '../Routing/RouteNames';
import { KrossrDialogService } from 'src/KrossrDialog/KrossrDialogService';

@Component({
    selector: 'krossr-level-editor-form',
    templateUrl: './LevelEditorFormView.html'
})
export class LevelEditorFormComponent implements AsyncLoadedComponent, OnInit {
    @Input() public isEdit = false;
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
        private dialogService: KrossrDialogService,
        private stateService: StateService,
        private tileFillEventService: TileFillEventService,
    ) {
    }

    public clearAll() {
        this.levelEditorFormClearEventService.formClearEvent.emit();
        this.tileFillEventService.fill.emit({ initState: false, override: TileState.empty });
    }

    public confirmBan() {
        return this.dialogService.open(ConfirmationComponent, this.getBanConfirmationOptions());
    }

    public confirmClear() {
        return this.dialogService.open(ConfirmationComponent, this.getClearConfirmationOptions());
    }

    public confirmRemove() {
        return this.dialogService.open(ConfirmationComponent, this.getRemoveConfirmationOptions());
    }

    public getBanConfirmationOptions = () => this.getConfirmationOptions('Ban', () => this.ban(this.level));
    public getClearConfirmationOptions = () => this.getConfirmationOptions('Clear', () => this.clearAll());
    public getRemoveConfirmationOptions = () => this.getConfirmationOptions('Remove', () => this.remove(this.level));

    public getConfirmationOptions(submitText, submitAction: () => void) {
        return {
            data: {
                submitText,
                submitAction
            } as ConfirmationOptions,
            disableClose: true
        };
    }

    async ban(level: ILevel) {
        await this.levelService.banLevel(level.id);
        this.goToList();
    }

    /** Remove any Level passed in */
    async remove(level: { id?: number }) {
        await this.levelService.removeLevel(level.id);
        this.goToList();
    }

    public async ngOnInit() {
        let options = await this.levelEditorFormService.getOptions();
        this.setupOptions(options);
        this.formGroup = new FormGroup({});
        this.nameFormControl = new FormControl(this.level.name, [Validators.required]);
        this.sizeFormControl = new FormControl(this.level.size, [Validators.required]);

        this.formGroup.addControl('name', this.nameFormControl);
        this.isReady = true;
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

    private goToList() {
        this.stateService.go(LevelRoutes.list, {}, { reload: true });
    }

    private setupOptions(options: LevelEditorSelectOptionsViewModel) {
        this.sizeMap = options.sizeOptions;
    }
}
