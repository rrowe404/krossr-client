import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './HeaderComponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HelpComponent } from '../Help/HelpComponent';
import { HeaderModule } from './HeaderModule';
import { StateService } from '@uirouter/core';
import { MockStateService } from 'src/test/MockStateService';
import { LevelRoutes } from '../Routing/RouteNames';
import { KrossrDialogService } from 'src/KrossrDialog/KrossrDialogService';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;
    let dialogService: KrossrDialogService;
    let stateService: StateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [MatDialogModule,
        HeaderModule],
    providers: [
        { provide: StateService, useClass: MockStateService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dialogService = TestBed.inject(KrossrDialogService);
        stateService = TestBed.inject(StateService);
        spyOn(stateService, 'go');
        spyOn(dialogService, 'open');
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should open the help', () => {
        component.openHelp();
        expect(dialogService.open).toHaveBeenCalledWith(HelpComponent);
    });

    it('should open the level select', () => {
        component.openLevelSelect();

        expect(stateService.go).toHaveBeenCalledWith(LevelRoutes.list);
    });
});
