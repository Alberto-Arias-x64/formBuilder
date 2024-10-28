import { Component, inject, OnInit, signal } from '@angular/core'
import { FormService } from '../form.service'
import { JsonPipe } from '@angular/common'

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
    this.data$.set(this._formService.formData$())
  }
}
