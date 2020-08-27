import { Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
    selector: 'krossr-pagination',
    styleUrls: ['./PaginationStyles.less'],
    templateUrl: './PaginationView.html'
})
export class PaginationComponent {
    @Input() public currentPage: number;
    @Input() public totalPages: number;
    @Output() public paginate: EventEmitter<number> = new EventEmitter();

    pageDown() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.paginate.emit(this.currentPage);
        }
    }

    pageUp() {
        if (this.currentPage + 1 < this.totalPages) {
            this.currentPage++;
            this.paginate.emit(this.currentPage);
        }
    }
}
