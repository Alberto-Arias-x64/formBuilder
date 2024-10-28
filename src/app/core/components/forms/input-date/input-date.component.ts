import { AfterViewInit, Component, forwardRef, input, signal } from '@angular/core'
import type { IInputDate } from '../forms.interface'
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'
import { Datepicker } from 'vanillajs-datepicker'
import { NgClass } from '@angular/common'

import es from './locales'

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements AfterViewInit, ControlValueAccessor, Validator {
  data = input<IInputDate>()
  id = signal(crypto.randomUUID())
  disabled = signal(true)
  errorMessage = signal('')
  errorStatus = signal(false)
  value = signal<string | null>(null)
  touched!: () => void
  changes!: (value: Date) => void
  datePickerReference!: Datepicker
  control!: AbstractControl

  ngAfterViewInit() {
    Object.assign(Datepicker.locales, es)
    const element = document.getElementById(this.id()) as HTMLInputElement
    this.datePickerReference = new Datepicker(element, { autohide: true, language: 'es' })
  }

  handleUpdate({ target }: Event) {
    const tar = target as HTMLInputElement
    if (tar) {
      this.value.set(tar.value)
      this.changes(new Date(Datepicker.parseDate(tar.value, 'dd/mm/yyyy', 'es')))
    }
  }
  handleBlur({ target }: Event) {
    const tar = target as HTMLInputElement
    if (tar.value === '') tar.value = this.value() || ''
  }
  handleTouch() {
    this.touched()
    this.validate(this.control)
  }

  checkLimits() {
    if (this.data()?.dateTo !== this.datePickerReference.config.maxDate) {
      this.datePickerReference.setOptions({ maxDate: this.data()?.dateTo })
    }
    if (this.data()?.dateFrom !== this.datePickerReference.config.minDate) {
      this.datePickerReference.setOptions({ minDate: this.data()?.dateFrom })
    }
  }

  writeValue(obj: Date) {
    this.value.set(Datepicker.formatDate(obj, 'dd/mm/yyyy', 'es'))
  }
  registerOnChange(fn: (value: Date) => void) {
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
        else this.errorMessage.set('Campo no valido')
        this.errorStatus.set(true)
      } else this.errorStatus.set(false)
    }, 1)
    if (!this.control) this.control = control
    return null
  }
}
