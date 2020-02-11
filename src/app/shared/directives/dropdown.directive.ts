import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    let dropdownClassHave = false;
    const element = event.target as HTMLElement;
    element.classList.forEach((item) => {
      if (item === 'dropdown') {
        dropdownClassHave = true;
      }
    });
    if (dropdownClassHave) {
      this.isOpen = !this.isOpen;
    }
  }
}
