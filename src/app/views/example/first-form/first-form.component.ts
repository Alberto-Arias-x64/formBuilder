import { FormLayoutComponent } from 'src/app/templates/form-layout/form-layout.component'
import { InputListComponent } from '@components/forms/input-list/input-list.component'
import { InputTextComponent } from '@components/forms/input-text/input-text.component'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Component, inject, OnInit } from '@angular/core'
import { ExampleService } from '../example.service'
import { NgStyle } from '@angular/common'

@Component({
  selector: 'app-first-form',
  standalone: true,
  imports: [FormLayoutComponent, ReactiveFormsModule, InputTextComponent, InputListComponent, NgStyle],
  templateUrl: './first-form.component.html',
  styleUrl: './first-form.component.css'
})
export class FirstFormComponent implements OnInit {
  private readonly _exampleService = inject(ExampleService)
  data = this._exampleService.firstFormData$()
  form!: FormGroup

  ngOnInit() {
    this.form = this._exampleService.buildForm(this.data)
  }

  handleSubmit() {
    if (this.form.invalid) return this._exampleService.validateForm(this.form)
    this._exampleService.firstForm = this.form.value
    console.log(this._exampleService.firstForm)
  }
}
