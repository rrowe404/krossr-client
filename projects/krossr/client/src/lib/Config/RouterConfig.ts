import { RouterParams } from '@krossr/types';
import { UIRouter } from '@uirouter/core';
import { HomeRoutes } from '../Routing/RouteNames';

export function uiRouterConfigFn(router: UIRouter) {
    let rules = router.urlService.rules;
    rules.initial((matchValue, url) => {
        let params = url.search as RouterParams;
        /**
         * this is used to implement the catch-all route on the backend
         * to simply redirect to the index page and let the client router handle it
         */
        return params.clientUrl || { state: HomeRoutes.home };
    });

    rules.otherwise(() => ({ state: HomeRoutes.notFound }));
}
