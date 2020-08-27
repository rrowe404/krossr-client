import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KrossrInputComponent } from './KrossrInputComponent';
import { KrossrInputModule } from './KrossrInputModule';
import { FormControl } from '@angular/forms';

describe('KrossrInputComponent', () => {
    let fixture: ComponentFixture<KrossrInputComponent>;
    let component: KrossrInputComponent;

    function getFixture(setup: (instance: KrossrInputComponent) => void) {
        let componentFixture = TestBed.createComponent(KrossrInputComponent);

        setup(componentFixture.componentInstance);

        componentFixture.detectChanges();

        return componentFixture;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                KrossrInputModule
            ]
        }).compileComponents();

        fixture = getFixture((instance) => instance.control = new FormControl());
        component = fixture.componentInstance;
    });

    it('should throw an error if no control is provided', () => {
        let getFixture2 = () => getFixture(() => {});
        expect(getFixture2).toThrow();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should sync the placeholder to the label if the placeholder is not provided', () => {
        let fixture2 = getFixture((instance) => {
            instance.control = new FormControl();
            instance.label = 'HiHo';
        });

        expect(fixture2.componentInstance.placeholder).toBe('HiHo');
    });

    it('should support a separate placeholder and label', () => {
        let fixture2 = getFixture((instance) => {
            instance.control = new FormControl();
            instance.label = 'HiHo';
            instance.placeholder = 'OhIo';
        });

        expect(fixture2.componentInstance.label).toBe('HiHo');
        expect(fixture2.componentInstance.placeholder).toBe('OhIo');
    });

    it('should update the control', () => {
        component.update('boof');
        expect(component.control.value).toBe('boof');
    });
});
