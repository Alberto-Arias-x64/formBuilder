import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms'
import { Component, ElementRef, forwardRef, HostListener, inject, input, signal } from '@angular/core'
import type { IInputList, ITypedParam } from 'src/app/types/interfaces/input.interface'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-input-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-list.component.html',
  styleUrl: './input-list.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputListComponent),
      multi: true
    }
  ]
})
export class InputListComponent implements ControlValueAccessor, Validator {
  private readonly elementRef = inject(ElementRef).nativeElement

  data = input.required<IInputList>()
  id = signal(crypto.randomUUID())
  disabled = signal(true)
  errorMessage = signal('')
  errorStatus = signal(false)
  activeStatus = signal(false)
  value = signal<ITypedParam | null>({ key: '', value: '' })
  touched!: () => void
  changes!: (value: ITypedParam) => void
  control!: AbstractControl

  @HostListener('window:click', ['$event'])
  handleTouch(event: MouseEvent) {
    if (!this.elementRef.contains(event.target) && this.activeStatus()) {
      this.touched()
      this.validate(this.control)
      this.activeStatus.set(false)
      const element = document.getElementById(this.id()) as HTMLInputElement
      if (element) element.value = this.value()?.value.toString() || ''
    }
  }

  handleBlur() {
    setTimeout(() => {
      this.touched()
      this.validate(this.control)
      this.activeStatus.set(false)
      const element = document.getElementById(this.id()) as HTMLInputElement
      if (element) element.value = this.value()?.value.toString() || ''
    }, 100)
  }

  handleUpdate(value: ITypedParam) {
    this.value.set(value)
    this.changes(value)
    this.activeStatus.set(false)
  }
  handleActive() {
    if (!this.disabled()) this.activeStatus.set(true)
  }

  writeValue(obj: ITypedParam) {
    this.value.set(obj)
  }
  registerOnChange(fn: (value: ITypedParam) => void) {
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
      if (control.hasValidator(Validators.required)) {
        if ((this.value()?.value === '' || this.value() === null) && !control.touched) control.setErrors({ required: true })
        else {
          if ((this.value()?.value === '' || this.value() === null) && control.touched) {
            this.errorMessage.set('Campo requerido')
            this.errorStatus.set(true)
          } else {
            this.errorStatus.set(false)
            control.setErrors(null)
          }
        }
      } else {
        this.errorStatus.set(false)
        control.setErrors(null)
      }
    }, 1)
    if (!this.control) this.control = control
    return null
  }
}
