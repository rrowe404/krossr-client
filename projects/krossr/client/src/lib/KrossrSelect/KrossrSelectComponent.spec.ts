import { KrossrSelectComponent } from "./KrossrSelectComponent";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KrossrSelectModule } from './KrossrSelectModule';
import { FormControl } from '@angular/forms';

describe('KrossrSelectComponent', () => {
    let fixture: ComponentFixture<KrossrSelectComponent>;
    let component: KrossrSelectComponent;

    function getFixture(setup: (instance: KrossrSelectComponent) => void) {
        let componentFixture = TestBed.createComponent(KrossrSelectComponent);
        setup(componentFixture.componentInstance);
        componentFixture.detectChanges(); 
        return componentFixture;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                KrossrSelectModule
            ]
        }).compileComponents();

        fixture = getFixture(instance => {
            instance.control = new FormControl('huh');
            instance.optionMap = { 'test': 'test2', 'fake': 'fake2' };
        });

        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should initialize the optionMap', () => {
        expect(component.options).toEqual(['test', 'fake']);
    });

    it('should update the value', () => {
        spyOn(component.updated, 'emit');

        component.update('fake2');
        expect(component.control.value).toEqual('fake2');
        expect(component.updated.emit).toHaveBeenCalledWith('fake2');
    });
});