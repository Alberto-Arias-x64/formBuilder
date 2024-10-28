import { FormBuilderComponent } from '@components/form-builder/form-builder.component'
import { Component, computed, inject, OnInit, signal } from '@angular/core'
import { CommonService } from '@services/common.service'
import { FormService } from './form.service'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormBuilderComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  private readonly _commonService = inject(CommonService)
  private readonly _formService = inject(FormService)

  step$ = computed(() => this._formService.currentStep$())
  formMap$ = computed(() => this._formService.formMap$())
  ready$ = signal(false)

  ngOnInit() {
    this._formService.currentStep$.set(0)
    this.loadData()
  }

  async loadData() {
    const formMap = await this._commonService.requestForm()
    this._formService.formMap$.set(formMap)
    if (await Promise.all([formMap])) this.ready$.set(true)
  }
}
