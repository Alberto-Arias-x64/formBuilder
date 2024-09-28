import { Directive, ElementRef, HostListener, inject } from '@angular/core'

@Directive({
  selector: '[appNumberOnly]',
  standalone: true
})
export class NumberOnlyDirective {
  private readonly el = inject(ElementRef)

  @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void }) {
    const initValue = this.el.nativeElement.value
    this.el.nativeElement.value = initValue.replace(/[^0-9]*/g, '')
    if (initValue !== this.el.nativeElement.value) event.stopPropagation()
  }
}
