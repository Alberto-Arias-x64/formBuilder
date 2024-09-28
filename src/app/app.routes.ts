import { Routes } from '@angular/router'
import { ErrorComponent } from './templates/error/error.component'
import { EErrors } from './core/types/enum/errors.enum'

export const routes: Routes = [{ path: '**', component: ErrorComponent, data: { errorType: EErrors.NOT_FOUND } }]
