import { LevelViewModel } from "src/Level/Level";

export class TestHelpers {
    static getLevelViewModel(): LevelViewModel {
        return { name: 'trogdor', layout: 'MTAwMDExMDAwMTEwMDAxMTAwMDExMTExMQ==', size: 25 };
    }

    static getErrorResponse(message: string): Promise<{ error: Error }> {
        return Promise.reject(this.getErrorResponseObject(message));
    }

    static getErrorResponseObject(message: string) {
        return { error: { message }};
    }
}
