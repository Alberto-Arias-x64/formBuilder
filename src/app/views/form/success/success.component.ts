import { JsonPipe } from '@angular/common'
import { Component, inject, OnInit, signal } from '@angular/core'
import { FormService } from '../form.service'

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit {
  private readonly _formService = inject(FormService)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data$ = signal<any>([])

  ngOnInit() {
    console.log(this._formService.formData$())
    this.data$.set(this._formService.formData$())
  }
}
