import { AbstractControl } from '@angular/forms'

export class CustomValidators {
  static equalTo(otherControlName: string) {
    return (control: AbstractControl) => {
      if (control.parent) {
        const otherControl = control.parent.get(otherControlName)
        if (otherControl && otherControl.value !== control.value) {
          return { equalTo: true }
        }
        return null
      }
      return null
    }
  }
}
