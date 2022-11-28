import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  public logo = {
    url: '../../../assets/images/logo-small.svg',
  };

  public menu = {
    url: '../../../assets/icons/burger-slim.svg',
    open: false,
    burgerUrl: '../../../assets/icons/burger-slim.svg',
    closeUrl: '../../../assets/icons/close-bold.svg',
  };

  constructor() {}

  toggleMenu() {
    this.menu.open = !this.menu.open;
    this.menu.url = this.menu.open ? this.menu.closeUrl : this.menu.burgerUrl;
  }
}