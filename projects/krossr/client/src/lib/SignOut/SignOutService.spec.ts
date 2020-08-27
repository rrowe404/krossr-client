import { TestBed } from '@angular/core/testing';
import { SignOutService } from './SignOutService';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignOutService', () => {
    let service: SignOutService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ]
        });

        service = TestBed.inject(SignOutService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
