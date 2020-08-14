import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LevelDecoder {
   /**
     * Converts a base64 string that decodes into a binary string into a layout
     * This assumes the layout was square, like most everything else
     */
    decodeLayout(layout: string): boolean[][] {
        // base64 string to binary string
        let binary: string = atob(layout);

        // how many characters of that binary string we should grab at once
        let sideLength = Math.sqrt(binary.length);

        let regexp = new RegExp('.{1,' + sideLength + '}', 'g');

        // evenly split up binary strings
        let split: string[] = binary.match(regexp);

        // convert to actual layout
        let resultLayout = split.map((binaryString) => {
            return binaryString.split('').map((value) => {
                return value === '1';
            });
        });

        return resultLayout;
    } 
}
