import { AfterViewInit, Component, forwardRef, input, signal } from '@angular/core'
import type { IInputDate } from '../forms.interface'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Datepicker } from 'vanillajs-datepicker'

import es from './locales'

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements AfterViewInit {
  data = input<IInputDate>()
  id = signal(crypto.randomUUID())
  disabled = signal(true)
  value = signal<string | null>(null)
  touched!: () => void
  changes!: (value: Date) => void
  datePickerReference!: Datepicker

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

  handleTouch() {
    this.touched()
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
}
