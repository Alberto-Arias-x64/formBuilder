import { Component, computed, inject, OnInit, signal } from '@angular/core'
import { SecondFormComponent } from './second-form/second-form.component'
import { FirstFormComponent } from './first-form/first-form.component'
import { CommonService } from 'src/app/core/services/common.service'
import { ExampleService } from './example.service'
import { ESteps } from './example.enum'

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
  step$ = computed<ESteps>(() => this._exampleService.currentStep$())
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
