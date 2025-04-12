import { Injectable } from '@angular/core';
import { DefaultService } from '@krossr/api';

@Injectable({
    providedIn: 'root'
})
export class CompleteLevelService {
    completeLevel(params: { levelLayout: string }) {
        const { levelLayout } = params;
        localStorage.setItem(levelLayout, 'true');
    }
}
