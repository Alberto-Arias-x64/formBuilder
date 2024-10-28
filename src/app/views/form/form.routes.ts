import { FormComponent } from './form.component'
import { FormService } from './form.service'
import { Routes } from '@angular/router'

export const formRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    providers: [FormService],
    component: FormComponent
  }
]
