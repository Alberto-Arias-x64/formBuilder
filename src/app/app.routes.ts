import { ErrorComponent } from './templates/error/error.component'
import { EErrors } from './core/types/enum/errors.enum'
import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', loadChildren: () => import('./views/form/form.routes').then((m) => m.formRoutes) },
  { path: '**', component: ErrorComponent, data: { errorType: EErrors.NOT_FOUND } }
]
