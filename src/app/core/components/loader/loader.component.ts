import { LoaderService } from 'src/app/core/components/loader/loader.service'
import { Component, inject, computed } from '@angular/core'

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
