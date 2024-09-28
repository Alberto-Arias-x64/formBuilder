import { Injectable, signal } from '@angular/core'
import { ESteps } from './example.enum'

@Injectable()
export class ExampleService {
  currentStep$ = signal<ESteps>(ESteps.FIRST_FORM)

  firstForm = new FormData()
  secondForm = new FormData()


}
