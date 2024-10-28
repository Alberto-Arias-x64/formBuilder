import { IFormMap } from '@components/form-builder/form-builder.interface'
import { Injectable, signal } from '@angular/core'

@Injectable()
export class FormService {
  currentStep$ = signal(0)
  formMap$ = signal<IFormMap[]>([])
  formData$ = signal<Record<string, string>[]>([])

  nextStep() {
    this.currentStep$.update((value) => value + 1)
  }
  previosStep() {
    this.currentStep$.update((value) => value - 1)
  }
  addData(data: Record<string, string>) {
    this.formData$.update((value) => [...value, data])
  }
}
