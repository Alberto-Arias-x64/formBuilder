import { FormLayoutComponent } from 'src/app/templates/form-layout/form-layout.component'
import { InputTextComponent } from '@components/forms/input-text/input-text.component'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Component, inject, OnInit } from '@angular/core'
import { ExampleService } from '../example.service'

@Component({
  selector: 'app-first-form',
  standalone: true,
  imports: [FormLayoutComponent, ReactiveFormsModule, InputTextComponent],
  templateUrl: './first-form.component.html',
  styleUrl: './first-form.component.css'
})
export class FirstFormComponent implements OnInit {
  private readonly _exampleService = inject(ExampleService)
  private readonly _formBuilder = inject(FormBuilder)
  form!: FormGroup

  ngOnInit() {
    return
  }

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this._exampleService.firstForm = this.form.value
  }
}
