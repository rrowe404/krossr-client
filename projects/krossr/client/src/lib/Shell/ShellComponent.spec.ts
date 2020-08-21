import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ShellComponent } from './ShellComponent';
import { HeaderModule } from '../Header/HeaderModule';
import { UIRouterModule } from '@uirouter/angular';

describe('ShellComponent', () => {
    let fixture: ComponentFixture<ShellComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HeaderModule,
                UIRouterModule.forRoot()
            ],
            declarations: [
                ShellComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ShellComponent);
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });
});