import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { inject, Injectable, signal } from '@angular/core'
import { IForm } from '@interfaces/mocks.interface'
import { ESteps } from './example.enum'

@Injectable()
export class ExampleService {
  private readonly _formBuilder = inject(FormBuilder)
  currentStep$ = signal<ESteps>(ESteps.FIRST_FORM)

  firstFormData$ = signal<IForm>([])

  firstForm = new FormData()
  secondForm = new FormData()

  public buildForm(data: IForm):FormGroup {
    const formGroupList = data.map((data) => {
      const validations = []
      if (data.requerido) validations.push(Validators.required)
      // Add more validations here
      return {
        [data.nombre]: new FormControl(data.valor, validations)
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
}
