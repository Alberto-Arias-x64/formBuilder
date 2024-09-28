import { HttpInterceptorFn } from '@angular/common/http'
import { catchError } from 'rxjs'

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      console.error(err)
      return next(err)
    })
  )
}
