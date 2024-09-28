import { IForm } from '../types/interfaces/mocks.interface'
import { environment } from 'src/environments/environment'
import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { delay, firstValueFrom, of } from 'rxjs'
import { LoaderService } from './loader.service'
import { formMock } from '@mocks/api.mock'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private readonly _loaderService = inject(LoaderService)
  private readonly _http = inject(HttpClient)

  private readonly API_URL = environment.apiUrl

  public apiRequest<T>(url: string): Promise<T> {
    return firstValueFrom(this._http.get<T>(this.API_URL + url))
  }

  public async requestForm(): Promise<IForm> {
    // const form = await this.apiRequest<IForm>("/form")
    this._loaderService.show()
    const form = await firstValueFrom(of(formMock).pipe(delay(1000))) // DUMMY
    if (form) this._loaderService.hide()
    return form
  }
}
