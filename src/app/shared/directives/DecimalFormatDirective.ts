import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appInputMask]'
})
export class DecimalFormatDirective implements OnInit {


  @Input('appInputMask') decimalPlaces: number | undefined;

  private regex!: RegExp;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Create the regex pattern based on the decimal places
    this.regex = new RegExp(`^\\d*\\.?\\d{0,${this.decimalPlaces}}$`);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('focusout')
  onFocusOut() {
    let value: string = this.el.nativeElement.value;
    if (value) {
      this.el.nativeElement.value = parseFloat(value).toFixed(this.decimalPlaces);
    }
  }
}
