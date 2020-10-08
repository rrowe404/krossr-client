import { FormGroup } from '@angular/forms';
import { KrossrError } from '@krossr/types';
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
    protected onError: (error: KrossrError) => void = this.defaultOnError;

    private defaultOnSuccess() {
        this.clearForm();
        this.displaySuccessMessage();

        return Promise.resolve();
    }

    private defaultOnError(error: KrossrError) {
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

    public displayErrorMessage(response: KrossrError) {
        nowAndLater(() => this.error = response.error.message, () => this.error = '');
    }

    public async submit() {
        try {
            await this.trySubmit();
            this.onSuccess();
        } catch(err) {
            this.onError(err);
        }
    }
}
