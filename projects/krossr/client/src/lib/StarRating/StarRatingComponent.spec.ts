import { TestBed, ComponentFixture } from "@angular/core/testing";
import { StarRatingComponent } from './StarRatingComponent';

describe('StarRatingComponent', () => {
    let fixture: ComponentFixture<StarRatingComponent>;
    let component: StarRatingComponent;

    function getFixture(rating: number, readonly: boolean) {
        let fixture = TestBed.createComponent(StarRatingComponent);
        let component = fixture.componentInstance;

        component.rating = rating;
        component.readOnly = readonly;

        fixture.detectChanges();

        return fixture;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                StarRatingComponent
            ]
        }).compileComponents();

        fixture = getFixture(3, false);
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
    });

    it('should have a functioning toggle function', () => {
        let fixture = getFixture(3, false);
        let component = fixture.componentInstance;

        component.toggle(3);
        expect(component.rating).toBe(4);
        expect(component.stars.filter(s => s.filled).length).toEqual(component.rating);
    });
});