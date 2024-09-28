import { Component } from '@angular/core';
import { FormLayoutComponent } from 'src/app/templates/form-layout/form-layout.component';

@Component({
  selector: 'app-first-form',
  standalone: true,
  imports: [FormLayoutComponent],
  templateUrl: './first-form.component.html',
  styleUrl: './first-form.component.css'
})
export class FirstFormComponent {

}
