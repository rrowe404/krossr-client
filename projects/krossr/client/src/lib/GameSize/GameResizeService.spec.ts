import { GameResizeService } from './GameResizeService';
import { TestBed } from '@angular/core/testing';

describe('GameResizeService', () => {
    let service: GameResizeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GameResizeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
