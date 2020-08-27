import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './PaginationComponent';

describe('PaginationComponent', () => {
    let fixture: ComponentFixture<PaginationComponent>;
    let component: PaginationComponent;

    function getFixture(currentPage: number, totalPages: number) {
        fixture = TestBed.createComponent(PaginationComponent);
        let comp = fixture.componentInstance;

        comp.currentPage = currentPage;
        comp.totalPages = totalPages;

        fixture.detectChanges();

        return fixture;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PaginationComponent
            ]
        }).compileComponents();

        fixture = getFixture(1, 2);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should not page down at page zero', () => {
        component.currentPage = 0;
        component.pageDown();

        expect(component.currentPage).toBe(0);
    });

    it('should page down at higher pages', () => {
        component.currentPage = 1;
        component.pageDown();

        expect(component.currentPage).toBe(0);
    });

    it('should page up at pages under the max', () => {
        component.currentPage = 0;
        component.pageUp();

        expect(component.currentPage).toBe(1);
    });

    it('should refuse to page up at the max page', () => {
        component.currentPage = 1;
        component.pageUp();

        expect(component.currentPage).toBe(1);
    });
});
