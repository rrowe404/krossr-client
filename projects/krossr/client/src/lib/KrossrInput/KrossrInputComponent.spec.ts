import { ComponentFixture, TestBed } from "@angular/core/testing";
import { KrossrInputComponent } from './KrossrInputComponent';
import { KrossrInputModule } from './KrossrInputModule';

describe('KrossrInputComponent', () => {
    let fixture: ComponentFixture<KrossrInputComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                KrossrInputModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(KrossrInputComponent);
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

});