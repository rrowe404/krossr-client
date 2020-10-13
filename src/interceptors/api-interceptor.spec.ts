import { TestBed } from '@angular/core/testing';
import { ApiInterceptor } from './api-interceptor';

describe('api-interceptor', () => {
    let interceptor: ApiInterceptor;

    it('should be injectable', () => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ApiInterceptor }
            ]
        });
        interceptor = TestBed.inject(ApiInterceptor);

        expect(interceptor).toBeTruthy();
    });

    it('should intercept correctly', () => {
        let handler = { handle: ({}) => {} };
        let req = { url: 'hey', clone: (options) => { let result = { url: options.url }; return result; } };
        spyOn(handler, 'handle');

        interceptor.intercept(req as any, handler as any);
        expect(handler.handle).toHaveBeenCalledWith({ url: 'api/hey' });
    });
});
