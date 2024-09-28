import type { IInputText } from 'src/app/types/interfaces/input.interface'
import { Component, forwardRef, input, signal } from '@angular/core'
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  imports: [NgClass],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor, Validator {
  data = input.required<IInputText>()
  id = signal(crypto.randomUUID())
  disabled = signal(true)
  errorMessage = signal('')
  errorStatus = signal(false)
  value = signal('')
  touched!: () => void
  changes!: (value: string) => void
  control!: AbstractControl

  handleUpdate({ target }: Event) {
    const tar = target as HTMLInputElement
    if (tar) {
      this.value.set(tar.value)
      this.changes(tar.value)
    }
  }

  handleTouch() {
    this.touched()
    this.validate(this.control)
  }

  writeValue(obj: string) {
    this.value.set(obj)
  }
  registerOnChange(fn: (value: string) => void) {
    this.changes = fn
  }
  registerOnTouched(fn: () => void) {
    this.touched = fn
  }
  setDisabledState?(isDisabled: boolean) {
    this.disabled.set(isDisabled)
  }
  validate(control: AbstractControl): ValidationErrors | null {
    setTimeout(() => {
      if (control.errors && control.touched) {
        if (control.errors['required']) this.errorMessage.set('Campo requerido')
        else if (control.errors['minlength']) this.errorMessage.set(`Mínimo ${control.errors['minlength'].requiredLength} caracteres`)
        else if (control.errors['maxlength']) this.errorMessage.set(`Máximo ${control.errors['maxlength'].requiredLength} caracteres`)
        else if (control.errors['email']) this.errorMessage.set('Formato de correo invalido')
        else if (control.errors['equalTo']) this.errorMessage.set('Los campos no coinciden')
        else this.errorMessage.set('Campo no valido')
        this.errorStatus.set(true)
      } else this.errorStatus.set(false)
    }, 1)
    if (!this.control) this.control = control
    return null
  }
}
