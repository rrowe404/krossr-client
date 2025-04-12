import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellComponent } from './ShellComponent';
import { HeaderModule } from '../Header/HeaderModule';
import { UIRouterModule } from '@uirouter/angular';
import { APP_BASE_HREF } from '@angular/common';
import { ShiftService } from '../Shift/ShiftService';
import { MatDialogModule } from '@angular/material/dialog';

describe('ShellComponent', () => {
    let fixture: ComponentFixture<ShellComponent>;
    let component: ShellComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [
        HeaderModule,
        MatDialogModule,
        UIRouterModule.forRoot()
    ],
    declarations: [ShellComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
    ]
}).compileComponents();

        fixture = TestBed.createComponent(ShellComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should manipulate the shiftService', () => {
        let shiftService: ShiftService = TestBed.inject(ShiftService);

        const event = new KeyboardEvent('keydown', {
            shiftKey: true
        });

        component.keydown(event);

        expect(shiftService.shiftOn).toBeTruthy();

        const event2 = new KeyboardEvent('keyup', {
            shiftKey: false
        });

        component.keyup(event2);

        expect(shiftService.shiftOn).toBeFalsy();

        const event3 = new KeyboardEvent('keydown', {
            shiftKey: false
        });

        component.keydown(event3);

        expect(shiftService.shiftOn).toBeFalsy();

        const event4 = new KeyboardEvent('keyup', {
            shiftKey: true
        });

        component.keyup(event4);
        expect(shiftService.shiftOn).toBeFalsy();
    });
});
