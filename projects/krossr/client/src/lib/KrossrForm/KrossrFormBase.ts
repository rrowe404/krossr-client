import { FormGroup } from '@angular/forms';
import { KrossrError } from '@krossr/types';
import { nowAndLater } from '../Debounce/Debounce';

export abstract class KrossrFormBase {
    abstract formGroup: FormGroup;
    abstract defaultMessage: string;

    public success: string;
    public error: string;

    private defaultSuccessMessage = 'Submitted!';
    public successMessage = this.defaultSuccessMessage;

    public buttonText() {
        return this.success || this.error || this.defaultMessage;
    }

    public clearForm() {
        this.formGroup.reset();
    }

    public displaySuccessMessage() {
        return nowAndLater(() => this.success = this.successMessage, () => this.success = '');
    }

    public displayErrorMessage(response: KrossrError) {
        nowAndLater(() => this.error = response.error.message, () => this.error = '');
    }
}
