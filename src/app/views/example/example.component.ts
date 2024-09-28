import { Component, inject, OnInit, signal } from '@angular/core'
import { FirstFormComponent } from './first-form/first-form.component'
import { SecondFormComponent } from './second-form/second-form.component'
import { ESteps } from './example.enum'
import { ExampleService } from './example.service'

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FirstFormComponent, SecondFormComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent implements OnInit {
  private readonly _exampleService = inject(ExampleService)

  stepsEnum = ESteps
  step$ = signal<ESteps>(ESteps.FIRST_FORM)

  ngOnInit() {
      this._exampleService.currentStep$.set(ESteps.FIRST_FORM)
  }
}
