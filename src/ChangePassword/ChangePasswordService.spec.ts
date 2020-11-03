import { TestBed } from '@angular/core/testing';
import { ChangePasswordService } from './ChangePasswordService';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ChangePasswordService', () => {
    let service: ChangePasswordService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(ChangePasswordService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make a request to the rating endpoint', async () => {
        let promise = service.changePassword('current', 'new', 'new');

        httpTestingController.expectOne('users/password').flush({});

        await promise;
        expect(true).toBe(true);
    });
});
