import { KrossrFormBase } from './KrossrFormBase';
import { FormGroup } from '@angular/forms';

describe('KrossrFormBase', () => {
    class DummyKrossrForm extends KrossrFormBase {
        formGroup = new FormGroup({});
        defaultMessage = '';
    }

    it('should call reset when cleared', () => {
        let formBase = new DummyKrossrForm();

        spyOn(formBase.formGroup, 'reset');

        formBase.clearForm();

        expect(formBase.formGroup.reset).toHaveBeenCalled();
    });
});
