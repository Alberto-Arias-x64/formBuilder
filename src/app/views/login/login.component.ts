import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest } from '@azure/msal-browser'
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular'
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core'
import { filter, Subject, takeUntil } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly _router = inject(Router)

  loginDisplay = false
  private readonly _destroying$ = new Subject<void>()

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private authService: MsalService, private msalBroadcastService: MsalBroadcastService) {}

  ngOnInit() {
    this.authService.handleRedirectObservable().subscribe()

    this.setLoginDisplay()

    this.msalBroadcastService.msalSubject$.pipe(filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED)).subscribe((result: EventMessage) => {
      if (this.authService.instance.getAllAccounts().length === 0) {
        window.location.pathname = '/'
      } else {
        this.setLoginDisplay()
      }
    })

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay()
        this.checkAndSetActiveAccount()
      })
  }

  ngOnDestroy() {
    this._destroying$.next(undefined)
    this._destroying$.complete()
  }

  private setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0
  }

  private checkAndSetActiveAccount() {
    const activeAccount = this.authService.instance.getActiveAccount()
    const accounts = this.authService.instance.getAllAccounts()
    if (!activeAccount && accounts.length > 0) this.authService.instance.setActiveAccount(accounts[0])
    else this._router.navigate([''])
  }
  public loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest).subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account)
      })
    } else {
      this.authService.loginPopup().subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account)
      })
    }
  }
}
