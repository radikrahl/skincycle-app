import { Directive, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';

@Directive()
export abstract class FrontendBaseComponent implements OnInit, OnDestroy {
  public abstract headerOptions: HeaderOptions;
  public abstract themeClass: string;
  constructor(
    private headerTitleService: HeaderTitleService,
    protected renderer: Renderer2
  ) {
    headerTitleService.onChange.subscribe(x => {
      this.headerOptions = x;
    })
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, this.themeClass);
  }
  ngOnInit(): void {
    this.headerTitleService.setHeaderOptions(this.headerOptions);
    this.renderer.addClass(document.body, this.themeClass);
  }
}
