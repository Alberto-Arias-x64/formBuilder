import { LoaderComponent } from '@components/loader/loader.component'
import { RouterOutlet } from '@angular/router'
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
