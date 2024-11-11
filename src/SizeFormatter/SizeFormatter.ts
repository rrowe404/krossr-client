import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SizeFormatter {
    formatSize(size: number) {
        return `${size}x${size}`;
    }
}