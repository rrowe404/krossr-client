import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Star } from './Star';

@Component({
    selector: 'star-rating',
    styleUrls: ['./StarRatingStyles.less'],
    templateUrl: './StarRatingView.html'
})
export class StarRatingComponent implements OnInit {
    @Input() public max = 5;
    @Output() public onRatingSelected: EventEmitter<number> = new EventEmitter();
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

            this.onRatingSelected.emit(this.rating);

            this.updateStars();
        }
    }
}
