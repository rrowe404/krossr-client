import { Ng2StateDeclaration, Transition } from '@uirouter/angular';
import { HomeComponent } from '../Home/HomeComponent';
import { LevelComponent } from '../Level/LevelComponent';
import { ForgotPasswordComponent } from '../ForgotPassword/ForgotPasswordComponent';
import { ResetPasswordComponent } from '../ResetPassword/ResetPasswordComponent';
import { HomeRoutes, LevelRoutes, UserRoutes } from './RouteNames';
import { NotFoundComponent } from '../NotFound/NotFoundComponent';
import { ResetPasswordService } from '../ResetPassword/ResetPasswordService';
import { LevelCreatorComponent } from '../LevelCreator/LevelCreatorComponent';
import { LevelEditorComponent } from '../LevelEditor/LevelEditorComponent';
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
                name: LevelRoutes.update,
                url: '/level/:levelId/edit',
                component: LevelEditorComponent,
                resolve: [
                    {
                        token: 'levelId',
                        deps: [Transition],
                        resolveFn(trans) {
                            return trans.params().levelId;
                        }
                    }
                ]
            },
            /** Password */
            {
                name: UserRoutes.resetInvalid,
                url: '/password/reset/invalid',
                component: ForgotPasswordComponent,
                resolve: [
                    { provide: 'invalid', useFactory() { return true; } }
                ]
            },
            {
                name: UserRoutes.reset,
                url: '/password/reset/:token',
                component: ResetPasswordComponent,
                async redirectTo(trans) {
                    let valid = await trans.injector().getAsync(Routes.tokenValidResolve);
                    return valid ? null : UserRoutes.resetInvalid;
                },
                resolve: [
                    {
                        token: 'token',
                        deps: [Transition],
                        resolveFn(trans) {
                            return trans.params().token;
                        }
                    },
                    {
                        token: Routes.tokenValidResolve,
                        deps: [Transition, ResetPasswordService],
                        resolveFn(trans, resetPasswordService: ResetPasswordService) {
                            return resetPasswordService.validateToken(trans.params().token);
                        }
                    }
                ]
            },
            {
                name: HomeRoutes.notFound,
                url: '/notfound',
                component: NotFoundComponent
            }
        ];
    }
}
