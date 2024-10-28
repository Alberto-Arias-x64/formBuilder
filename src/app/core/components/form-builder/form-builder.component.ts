import { FormLayoutComponent } from 'src/app/templates/form-layout/form-layout.component'
import { InputCheckComponent } from '../forms/input-check/input-check.component'
import { InputListComponent } from '../forms/input-list/input-list.component'
import { InputTextComponent } from '../forms/input-text/input-text.component'
import { InputDateComponent } from '../forms/input-date/input-date.component'
import { Component, inject, input, OnInit, output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FormBuilderService } from './form-builder.service'
import type { ITypedParam } from '../forms/forms.interface'
import type { IFormMap } from './form-builder.interface'
import { EFormType } from '../forms/forms.enum'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [InputListComponent, InputTextComponent, InputDateComponent, InputCheckComponent, FormLayoutComponent, ReactiveFormsModule, NgClass],
  providers: [FormBuilderService],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.css'
})
export class FormBuilderComponent implements OnInit {
  private readonly _formBuilderService = inject(FormBuilderService)

  formMap = input.required<IFormMap>()
  formData = output<Record<string, string>>()

  LIST_TYPES = EFormType
  form = new FormGroup({})

  ngOnInit(): void {
    const formData = this.formMap().formData.sort((a, b) => a.orden - b.orden)
    this.formMap().formData = formData
    this.form = this._formBuilderService.buildForm(this.formMap().formData)
  }

  convertList(list: string | null): ITypedParam[] {
    return this._formBuilderService.convertList(list)
  }

  handleSubmit() {
    if (this.form.invalid) return this._formBuilderService.validateForm(this.form)
    alert('Formulario valido')
    this.formData.emit(this.form.value)
  }
}
