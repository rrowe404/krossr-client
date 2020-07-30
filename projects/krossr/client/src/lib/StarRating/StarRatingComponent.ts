import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Star } from './Star';

@Component({
    selector: 'krossr-star-rating',
    styleUrls: ['./StarRatingStyles.less'],
    templateUrl: './StarRatingView.html'
})
export class StarRatingComponent implements OnInit {
    @Input() public max = 5;
    @Output() public ratingSelected: EventEmitter<number> = new EventEmitter();
    @Input() public rating: number;
    @Input() public readOnly;

    public stars: Star[];

    private updateStars() {
        this.stars = [];

        for (let i = 0; i < this.max; i++) {
            this.stars.push({
                filled: i < this.rating
            });
        }
    }

    ngOnInit() {
        this.updateStars();
    }

    toggle(index) {
        if (!this.readOnly) {
            this.rating = index + 1;

            this.ratingSelected.emit(this.rating);

            this.updateStars();
        }
    }
}
