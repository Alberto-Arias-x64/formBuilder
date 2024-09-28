import { Component, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EErrors } from '../../core/types/enum/errors.enum'

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  errorType = signal<EErrors>(EErrors.NOT_FOUND)

  constructor(private route: ActivatedRoute) {
    this.errorType.set(this.route.snapshot.data['errorType'])
  }
}
