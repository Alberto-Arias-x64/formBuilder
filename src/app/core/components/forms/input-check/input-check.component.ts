import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Component, forwardRef, signal } from '@angular/core'

@Component({
  selector: 'app-input-check',
  standalone: true,
  imports: [],
  templateUrl: './input-check.component.html',
  styleUrl: './input-check.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckComponent),
      multi: true
    }
  ]
})
export class InputCheckComponent implements ControlValueAccessor {
  id = signal(crypto.randomUUID())
  value = signal(false)
  touched!: () => void
  changes!: (value: boolean) => void

  handleUpdate() {
    if (this.value()) this.value.set(false)
    else this.value.set(true)
    this.changes(this.value())
  }

  handleTouch() {
    this.touched()
  }

  writeValue(obj: boolean) {
    this.value.set(obj)
  }
  registerOnChange(fn: (value: boolean) => void) {
    this.changes = fn
  }
  registerOnTouched(fn: () => void) {
    this.touched = fn
  }
}
