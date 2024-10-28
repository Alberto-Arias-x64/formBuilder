import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ITypedParam } from '../forms/forms.interface'
import { IInputForm } from './form-builder.interface'
import { inject, Injectable } from '@angular/core'

@Injectable()
export class FormBuilderService {
  private readonly _formBuilder = inject(FormBuilder)

  public buildForm(data: IInputForm[]):FormGroup {
    const formGroupList = data.map((data) => {
      const validations = []
      if (data.validations?.required) validations.push(Validators.required)
      if (data.validations?.email) validations.push(Validators.email)
      if (data.validations?.minLength) validations.push(Validators.minLength(data.validations.minLength))
      if (data.validations?.maxLength) validations.push(Validators.maxLength(data.validations.maxLength))
      if (data.validations?.min) validations.push(Validators.min(data.validations.min))
      if (data.validations?.max) validations.push(Validators.max(data.validations.max))
      // Add more validations here
      return {
        [data.name]: new FormControl(null, validations)
      }
    })
    const FormGroup = {}
    formGroupList.forEach((formGroup) => {
      Object.assign(FormGroup, formGroup)
    })
    return this._formBuilder.group(FormGroup)
  }

  public validateForm(form: FormGroup) {
    Object.keys(form.controls).forEach((controlName) => {
      const control = form.controls[controlName]
      control.markAsTouched()
      control.updateValueAndValidity()
    })
  }

  public convertList(list: string | null): ITypedParam[] {
    if (list == null) return [{"key": 0, "value": "Sin datos"}]
    return JSON.parse(list)
  }
}
