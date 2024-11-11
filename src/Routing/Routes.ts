import { Ng2StateDeclaration, Transition } from '@uirouter/angular';
import { HomeComponent } from '../Home/HomeComponent';
import { LevelComponent } from '../Level/LevelComponent';
import { HomeRoutes, LevelRoutes } from './RouteNames';
import { NotFoundComponent } from '../NotFound/NotFoundComponent';
import { LevelCreatorComponent } from '../LevelCreator/LevelCreatorComponent';
import { LevelSelectComponent } from '../LevelSelect/LevelSelectComponent';

export class Routes {
    static tokenValidResolve = 'tokenValid';

    static getNg2Routes(): Ng2StateDeclaration[] {
        return [
            {
                name: HomeRoutes.home,
                url: '/',
                component: HomeComponent
            },
            /** Level */
            {
                name: LevelRoutes.create,
                url: '/level/new',
                component: LevelCreatorComponent
            },
            {
                name: LevelRoutes.read,
                url: '/level/:levelId',
                component: LevelComponent,
                resolve: [
                    { provide: 'mode', useFactory() { return 'view'; } },
                    {
                        token: 'levelId',
                        deps: [Transition],
                        resolveFn(trans) {
                            return trans.params().levelId;
                        }
                    }
                ]
            },
            {
                name: LevelRoutes.list,
                url: '/levels',
                component: LevelSelectComponent
            },
            {
                name: HomeRoutes.notFound,
                url: '/notfound',
                component: NotFoundComponent
            }
        ];
    }
}
