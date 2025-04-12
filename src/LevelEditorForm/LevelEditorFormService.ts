import { Injectable } from '@angular/core';
import { SizeFormatter } from 'src/SizeFormatter/SizeFormatter';
import { SizeOptions } from 'src/SizeOptions/SizeOptions';

@Injectable({
    providedIn: 'root'
})
export class LevelEditorFormService {
    constructor(
        private sizeFormatter: SizeFormatter
    ) {
    }

    async getOptions() {
        let sizeOptions: { [key: string]: number } = {};

        SizeOptions.Options.forEach(option => {
            // sizes in sizeOptions are per-side, but the editor needs to know the total number
            // this assumes square matrices, as most of the app does
            let key = this.sizeFormatter.formatSize(option);
            sizeOptions[key] = Math.pow(option, 2);
        });

        return { sizeOptions };
    }
}
