import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'
import { AfterViewInit, Component, forwardRef, input, signal } from '@angular/core'
import type { IInputText } from '../forms.interface'
import { NgClass } from '@angular/common'
import { EFormType } from '../forms.enum'

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
export class InputTextComponent implements ControlValueAccessor, Validator, AfterViewInit {
  data = input.required<IInputText>()
  dataType = input.required<EFormType>()
  id = signal(crypto.randomUUID())
  disabled = signal(true)
  errorMessage = signal('')
  errorStatus = signal(false)
  value = signal('')
  touched!: () => void
  changes!: (value: string) => void
  control!: AbstractControl

  ngAfterViewInit() {
    const inputText = document.getElementById(this.id()) as HTMLInputElement
    if (inputText && this.dataType() === EFormType.PASSWORD) inputText.type = 'password'
  }

  handleFilterType(event: KeyboardEvent) {
    if (this.dataType() === EFormType.NUMBER) {
      if (event.key === 'Backspace') return
      if (event.key === 'Delete') return
      if (event.key === 'ArrowLeft') return
      if (event.key === 'ArrowRight') return
      if (!event.key.match(/[0-9]/gm)) event.preventDefault()
    }
    if (this.dataType() === EFormType.MONEY){
      if (event.key === '0' && this.toNumber(this.value()) === 0) event.preventDefault()
      if (event.key === 'Backspace' && this.toNumber(this.value()) === 0) event.preventDefault()
      if (event.key === 'Backspace') return
      if (event.key === 'Delete') return
      if (event.key === 'ArrowLeft') return
      if (event.key === 'ArrowRight') return
      if (!event.key.match(/[0-9]/gm)) event.preventDefault()
    }
  }
  handleUpdate({ target }: Event) {
    const tar = target as HTMLInputElement
    if (tar) {
      if (this.dataType() === EFormType.MONEY) {
        this.value.set(this.toCurrency(this.toNumber(tar.value)))
        this.changes(this.toNumber(tar.value).toString())
      } else {
        this.value.set(tar.value)
        this.changes(tar.value)
      }
    }
  }
  handleTouch() {
    this.touched()
    this.validate(this.control)
  }
  toNumber(value: string) {
    if (!value) return 0
    const cleanValue = value.replace(/[^0-9]/g, '')
    if (cleanValue) return parseInt(cleanValue, 10)
    return 0
  }
  toCurrency(number: number) {
    return '$' + number.toLocaleString()
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
        else if (control.errors['min']) this.errorMessage.set(`El valor mínimo debe ser de ${this.dataType() === EFormType.MONEY ?  this.toCurrency(control.errors['min'].min) : control.errors['min'].min}`)
        else if (control.errors['max']) this.errorMessage.set(`El valor máximo debe ser de ${this.dataType() === EFormType.MONEY ?  this.toCurrency(control.errors['max'].max) : control.errors['max'].max}`)
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
