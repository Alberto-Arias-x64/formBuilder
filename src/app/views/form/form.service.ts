import { IFormMap } from '@components/form-builder/form-builder.interface'
import { Injectable, signal } from '@angular/core'

@Injectable()
export class FormService {
  currentStep$ = signal(0)
  formMap$ = signal<IFormMap[]>([])
}
