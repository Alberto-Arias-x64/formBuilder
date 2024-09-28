import { ExampleComponent } from './example.component'
import { ExampleService } from './example.service'
import { Routes } from '@angular/router'

export const sampleRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    providers: [ExampleService],
    component: ExampleComponent
  }
]
