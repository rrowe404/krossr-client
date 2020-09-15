import { UIRouter } from '@uirouter/core';
import { HomeRoutes } from '../Routing/RouteNames';

export function uiRouterConfigFn(router: UIRouter) {
    let rules = router.urlService.rules;
    rules.initial((matchValue, url) => {
        return { state: HomeRoutes.home };
    });

    rules.otherwise(() => ({ state: HomeRoutes.notFound }));
}
