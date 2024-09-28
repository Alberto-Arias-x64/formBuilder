import { Component, inject, OnInit, signal } from '@angular/core'
import { FirstFormComponent } from './first-form/first-form.component'
import { SecondFormComponent } from './second-form/second-form.component'
import { ESteps } from './example.enum'
import { ExampleService } from './example.service'
import { CommonService } from 'src/app/core/services/common.service'

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FirstFormComponent, SecondFormComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent implements OnInit {
  private readonly _exampleService = inject(ExampleService)
  private readonly _commonService = inject(CommonService)

  stepsEnum = ESteps
  step$ = signal<ESteps>(ESteps.FIRST_FORM)
  ready$ = signal(false)

  ngOnInit() {
    this._exampleService.currentStep$.set(ESteps.FIRST_FORM)
    this.loadData()
  }

  async loadData() {
    const firstFormData = await this._commonService.requestForm()
    this._exampleService.firstFormData$.set(firstFormData)
    if (await Promise.all([firstFormData])) this.ready$.set(true)
  }
}
