import { FormBuilderComponent } from '@components/form-builder/form-builder.component'
import { Component, computed, inject, OnInit, signal } from '@angular/core'
import { CommonService } from '@services/common.service'
import { FormService } from './form.service'
import { Router } from '@angular/router'
import { MsalService } from '@azure/msal-angular'

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
  private readonly _router = inject(Router)
  private readonly _authService = inject(MsalService)

  step$ = computed(() => this._formService.currentStep$())
  formMap$ = computed(() => this._formService.formMap$())
  ready$ = signal(false)

  ngOnInit() {
    this._formService.currentStep$.set(0)
    this.loadData()
    if (!this._authService.instance.getActiveAccount()) {
      this._router.navigate(['login'])
    }
  }

  async loadData() {
    const formMap = await this._commonService.requestForm()
    this._formService.formMap$.set(formMap.sort((a, b) => a.order - b.order))
    if (await Promise.all([formMap])) this.ready$.set(true)
  }

  handleSubmit(data: Record<string, string>) {
    this._formService.addData(data)
    this._formService.nextStep()
    if (this.step$() > this.formMap$().length - 1) this._router.navigate(['success'])
  }
}
