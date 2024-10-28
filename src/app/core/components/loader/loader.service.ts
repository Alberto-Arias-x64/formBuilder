import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly loadingState$ = signal(false)

  get state$() {
    return this.loadingState$.asReadonly()
  }

  public show() {
    this.loadingState$.set(true)
  }

  public hide() {
    this.loadingState$.set(false)
  }
}
