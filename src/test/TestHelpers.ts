import { ErrorResponse, LevelViewModel } from '@krossr/api';

export class TestHelpers {
    static getLevelViewModel(): LevelViewModel {
        return { id: 1, name: 'trogdor', layout: 'MTAwMDExMDAwMTEwMDAxMTAwMDExMTExMQ==', size: 25 };
    }

    static getErrorResponse(message: string): Promise<{ error: ErrorResponse }> {
        return Promise.reject(this.getErrorResponseObject(message));
    }

    static getErrorResponseObject(message: string) {
        return { error: { message }};
    }
}
