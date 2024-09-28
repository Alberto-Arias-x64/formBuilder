import { Component, inject, computed } from '@angular/core'
import { LoaderService } from '@services/loader.service'

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  private readonly _loadingStateService$ = inject(LoaderService).state$

  loadingState$ = computed(() => this._loadingStateService$())
}
