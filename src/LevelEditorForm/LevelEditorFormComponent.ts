import { Input, Output, OnInit, EventEmitter, Component } from '@angular/core';
import { ILevel } from '../Level/Level';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from '../Confirmation/ConfirmationComponent';
import { ConfirmationOptions } from '../Confirmation/ConfirmationOptions';
import { LevelEditorFormService } from './LevelEditorFormService';
import { LevelEditorFormClearEventService } from './LevelEditorFormClearEventService';
import { TileFillEventService } from '../Tile/TileFillEventService';
import { TileState } from '../Tile/TileState';
import { AsyncLoadedComponent } from '../Async/AsyncLoadedComponent';
import { KrossrDialogService } from 'src/KrossrDialog/KrossrDialogService';
import { LevelEditorSelectOptionsViewModel } from '@krossr/api';

@Component({
    selector: 'krossr-level-editor-form',
    templateUrl: './LevelEditorFormView.html'
})
export class LevelEditorFormComponent implements AsyncLoadedComponent, OnInit {
    @Input() public level: ILevel;
    @Input() public error: string;
    @Input() public submitText: string;
    @Output() public sizeChange: EventEmitter<void> = new EventEmitter();
    @Output() public submitAction: EventEmitter<ILevel> = new EventEmitter();

    public isReady = false;

    public banMessage: string;
    public formGroup: FormGroup;
    public nameFormControl: FormControl;
    public sizeFormControl: FormControl;
    public banMessageFormControl: FormControl;

    public sizeMap: { [key: string]: number };

    constructor(
        private levelEditorFormClearEventService: LevelEditorFormClearEventService,
        private levelEditorFormService: LevelEditorFormService,
        private dialogService: KrossrDialogService,
        private tileFillEventService: TileFillEventService,
    ) {
    }

    public clearAll() {
        this.levelEditorFormClearEventService.formClearEvent.emit();
        this.tileFillEventService.fill.emit({ initState: false, override: TileState.empty });
    }

    public confirmClear() {
        return this.dialogService.open(ConfirmationComponent, this.getClearConfirmationOptions());
    }

    public getClearConfirmationOptions = () => this.getConfirmationOptions('Clear', () => this.clearAll());

    public getConfirmationOptions(submitText, submitAction: () => void) {
        return {
            data: {
                submitText,
                submitAction
            } as ConfirmationOptions,
            disableClose: true
        };
    }

    public async ngOnInit() {
        let options = await this.levelEditorFormService.getOptions();
        this.setupOptions(options);
        this.formGroup = new FormGroup({});
        this.nameFormControl = new FormControl(this.level.name, [Validators.required]);
        this.sizeFormControl = new FormControl(this.level.size, [Validators.required]);
        this.banMessageFormControl = new FormControl('', []);

        this.formGroup.addControl('name', this.nameFormControl);
        this.formGroup.addControl('banMessage', this.banMessageFormControl);
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

    public updateBanMessage(message: string) {
        this.banMessage = message;
    }

    private setupOptions(options: LevelEditorSelectOptionsViewModel) {
        this.sizeMap = options.sizeOptions;
    }
}
