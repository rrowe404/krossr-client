import { FormGroup } from '@angular/forms';

export abstract class KrossrFormBase {
    abstract formGroup: FormGroup;

    public clearForm() {
        this.formGroup.reset();
    }
}
