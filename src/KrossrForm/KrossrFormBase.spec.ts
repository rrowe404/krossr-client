import { KrossrFormBase } from './KrossrFormBase';

describe('KrossrFormBase', () => {
    class DummyKrossrForm extends KrossrFormBase {
        defaultMessage = '';
        trySubmit = () => Promise.resolve();
    }

    it('should call reset when cleared', () => {
        let formBase = new DummyKrossrForm();

        spyOn(formBase.formGroup, 'reset');

        formBase.clearForm();

        expect(formBase.formGroup.reset).toHaveBeenCalled();
    });
});
