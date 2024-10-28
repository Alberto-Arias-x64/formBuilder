import { SuccessComponent } from './success/success.component'
import { FormComponent } from './form.component'
import { FormService } from './form.service'
import { Routes } from '@angular/router'

export const formRoutes: Routes = [
  {
    path: '',
    providers: [FormService],
    children: [
      {
        path: 'success',
        component: SuccessComponent
      },
      {
        path: '',
        pathMatch: 'full',
        component: FormComponent
      }
    ]
  }
]
