import { FormGroup } from '@angular/forms';
import { ErrorResponse } from '@krossr/api';
import { nowAndLater } from '../Debounce/Debounce';

export abstract class KrossrFormBase {
    public formGroup: FormGroup = new FormGroup({});
    abstract defaultMessage: string;

    public success: string;
    public error: string;

    private defaultSuccessMessage = 'Submitted!';
    public successMessage = this.defaultSuccessMessage;

    abstract trySubmit: () => Promise<any>;
    protected onSuccess: () => Promise<any> = this.defaultOnSuccess;
    protected onError: (error: ErrorResponse) => void = this.defaultOnError;

    private defaultOnSuccess() {
        this.clearForm();
        this.displaySuccessMessage();

        return Promise.resolve();
    }

    private defaultOnError(error: ErrorResponse) {
        this.clearForm();
        this.displayErrorMessage(error);
    }

    public buttonText() {
        return this.success || this.error || this.defaultMessage;
    }

    public clearForm() {
        this.formGroup.reset();
    }

    public displaySuccessMessage() {
        return nowAndLater(() => this.success = this.successMessage, () => this.success = '').toPromise();
    }

    public displayErrorMessage(response: ErrorResponse) {
        nowAndLater(() => this.error = response.message, () => this.error = '');
    }

    public async submit() {
        try {
            await this.trySubmit();
            this.onSuccess();
        } catch (err) {
            this.onError(err.error as ErrorResponse);
        }
    }
}
