import { NumberOnlyDirective } from 'src/app/util/directives/number-only.directive'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Component, forwardRef, signal } from '@angular/core'

@Component({
  selector: 'app-input-otp',
  standalone: true,
  imports: [NumberOnlyDirective],
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOtpComponent),
      multi: true
    }
  ]
})
export class InputOtpComponent implements ControlValueAccessor {
  id = signal(crypto.randomUUID())
  otp1 = signal('')
  otp2 = signal('')
  otp3 = signal('')
  otp4 = signal('')
  otp5 = signal('')
  value = signal('')
  errorStatus = signal(false)
  touched!: () => void
  changes!: (value: string) => void

  writeValue(obj: string) {
    this.value.set(obj)
  }
  registerOnChange(fn: (value: string) => void) {
    this.changes = fn
  }
  registerOnTouched(fn: () => void) {
    this.touched = fn
  }
  autoTab(event: KeyboardEvent) {
    const { id, value } = event.target as HTMLInputElement
    if (id === 'otp1-' + this.id()) this.otp1.set(value)
    else if (id === 'otp2-' + this.id()) this.otp2.set(value)
    else if (id === 'otp3-' + this.id()) this.otp3.set(value)
    else if (id === 'otp4-' + this.id()) this.otp4.set(value)
    else if (id === 'otp5-' + this.id()) this.otp5.set(value)
    this.value.set(this.otp1() + this.otp2() + this.otp3() + this.otp4() + this.otp5())
    this.changes(this.value())
    if (event.key === 'Backspace') {
      if (id === 'otp5-' + this.id()) document.getElementById('otp4-' + this.id())?.focus()
      else if (id === 'otp4-' + this.id()) document.getElementById('otp3-' + this.id())?.focus()
      else if (id === 'otp3-' + this.id()) document.getElementById('otp2-' + this.id())?.focus()
      else if (id === 'otp2-' + this.id()) document.getElementById('otp1-' + this.id())?.focus()
    } else {
      if (id === 'otp4-' + this.id()) document.getElementById('otp5-' + this.id())?.focus()
      else if (id === 'otp3-' + this.id()) document.getElementById('otp4-' + this.id())?.focus()
      else if (id === 'otp2-' + this.id()) document.getElementById('otp3-' + this.id())?.focus()
      else if (id === 'otp1-' + this.id()) document.getElementById('otp2-' + this.id())?.focus()
    }
  }
  checkFocus() {
    setTimeout(() => {
      let active = false
      const inputs = document.getElementById(this.id())?.querySelectorAll('input') || []
      inputs.forEach((input) => {
        if (input.matches(':focus')) active = true
      })
      if (!active) {
        this.touched()
        if (this.value().length !== 5) this.errorStatus.set(true)
        else this.errorStatus.set(false)
      }
    }, 1)
  }
}
