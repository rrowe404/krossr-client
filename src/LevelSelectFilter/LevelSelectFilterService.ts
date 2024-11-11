import { Injectable } from '@angular/core';
import { SizeFormatter } from 'src/SizeFormatter/SizeFormatter';
import { SizeOptions } from 'src/SizeOptions/SizeOptions';

export interface LevelListFilterSelectOptionsViewModel {
    sizeOptions: { [key: string]: number };
}

@Injectable({
    providedIn: 'root'
})
export class LevelSelectFilterService {
    constructor(
        private sizeFormatter: SizeFormatter
    ) {
    }

    async getOptions(): Promise<LevelListFilterSelectOptionsViewModel> {
        let sizeOptions: { [key: string]: number } = {
            All: null
        };

        SizeOptions.Options.forEach(size => {
            sizeOptions[this.sizeFormatter.formatSize(size)] = size;
        });

        return Promise.resolve({ sizeOptions });
    }
}
