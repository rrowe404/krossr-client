import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CompleteLevelService {
    completeLevel(params: { levelLayout: string }) {
        const { levelLayout } = params;
        localStorage.setItem(levelLayout, 'true');
    }
}
