import { ErrorComponent } from './templates/error/error.component'
import { EErrors } from './core/types/enum/errors.enum'
import { MsalGuard } from '@azure/msal-angular'
import { Routes } from '@angular/router'
import { LoginComponent } from './views/login/login.component'

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'login-failed', component: ErrorComponent, data: { errorType: EErrors.LOGIN_ERROR } },
  { path: '', canActivate: [MsalGuard], loadChildren: () => import('./views/form/form.routes').then((m) => m.formRoutes) },
  { path: '**', component: ErrorComponent, data: { errorType: EErrors.NOT_FOUND } }
]
