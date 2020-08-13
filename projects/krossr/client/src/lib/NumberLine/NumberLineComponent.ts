import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { LineContent } from '../LineContent/LineContent';
import { TileGroup } from '../TileGroup/TileGroup';
import { TileSizeService } from '../TileSize/TileSizeService';
import { Component, Input, OnInit } from '@angular/core';
import { TileGroupEntry } from '../TileGroup/TileGroupEntry';

@Component({
    selector: 'krossr-number-line',
    styleUrls: ['./NumberLineStyles.less'],
    templateUrl: './NumberLineView.html'
})
export class NumberLineComponent implements OnInit {

    constructor(
        private tileSizeService: TileSizeService
    ) {
    }

    @Input() public gameMatrix: BooleanMatrix;
    @Input() public goalMatrix: BooleanMatrix;
    public lineContent: LineContent[] = [];

    private currentGroup: TileGroup = new TileGroup();
    private hasGroup = false;

    @Input() public index: number;
    @Input() public orientation: string;

    ngOnInit() {
        this.getLineContent();
    }

    // display a crossed out 0 if the linecontent comes back with no content. otherwise, pass through
    private accountForZeros(lineContent: LineContent[]): LineContent[] {
        if (lineContent.length === 0) {
            return [{
                finished: true,
                text: 0
            }];
        } else {
            return lineContent;
        }
    }

    /* When computing number lines for the top part, we need to reverse the results
        before joining them for display, so they will appear in the correct order */
    private adjustContentForOrientation(lineContent: LineContent[], orientation: string): LineContent[] {
        if (orientation === 'vertical') {
            lineContent = lineContent.reverse();
        }

        return lineContent;
    }

    /* Given a matrix index for a row or column and an indication for which it is,
        calculate groups of consective tiles in that row or column */
    private calculateGroup(index: number, orientation: string): TileGroup {
        let groupCount = 0;
        let currentGroup: TileGroup = new TileGroup();
        let resetInd = true;

        // Loop through the row, building a separate count for each group of consecutive true tiles
        for (let i = 0; i < this.goalMatrix.length; i++) {
            // If the rotated goal matrix contains a true tile at the current index...
            if (this.goalMatrix.getValueAt(index, i)) {
                if (!currentGroup[groupCount]) {
                    currentGroup[groupCount] = [];
                }

                // Add the tile to the grouping.
                currentGroup[groupCount].push(
                    {
                        coord: {
                            y: index,
                            x: i
                        },
                        currentValue: this.gameMatrix.getValueAt(index, i),
                        goalValue: this.goalMatrix.getValueAt(index, i)
                    } as TileGroupEntry
                );

                resetInd = true;
            } else {
                if (resetInd) {
                    groupCount++;
                }

                resetInd = false;
            }
        }

        return currentGroup;
    }

    /* To compute the number lines for the current row or column, we need to find the length of each grouping */
    private getGroupings(currentGroup: TileGroup): LineContent[] {
        return Object.keys(currentGroup).map((value, index) => {
            let key = parseInt(value, 10);

            return {
                finished: false,
                text: currentGroup[key].length
            };
        });
    }

    /* For a given row or column, compute its number line (guide numbers on the sides of the board) */
    private getLineContent(): LineContent[] {
        if (!this.hasGroup) {
            this.currentGroup = this.calculateGroup(this.index, this.orientation);
            this.hasGroup = true;
            let groupings = this.getGroupings(this.currentGroup);
            this.lineContent = this.accountForZeros(this.adjustContentForOrientation(groupings, this.orientation));
        }

        return this.lineContent;
    }

    public getHeight(): string {
        let tileSize: number = this.tileSizeService.getTileSize();

        return this.orientation === 'vertical' ? (tileSize / 2) + 'px' : tileSize + 'px';
    }

    public getWidth(): string {
        let tileSize: number = this.tileSizeService.getTileSize();

        return this.orientation === 'horizontal' ? (tileSize / 2) + 'px' : tileSize + 'px';
    }

    public toggleFinished(entry: LineContent) {
        entry.finished = !entry.finished;
    }
}
