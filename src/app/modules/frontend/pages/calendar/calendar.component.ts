import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { IngredientRelations } from 'src/app/models/ingredient-relations.model';
import { Product } from 'src/app/products/models/product.model';
import { Routine } from 'src/app/models/routine.model';

import { CalendarService } from 'src/app/shared/services/calendar.service';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
import { FrontendBaseComponent } from '../../base.component';
import { CalendarModel, VisibleDay } from './calendar.model';


@Component({
  selector: 'sc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarService],
})
export class CalendarComponent
  extends FrontendBaseComponent
  implements OnDestroy, OnInit
{
  public isEvening;
  public themeClass: string;
  public headerOptions: HeaderOptions;

  public routine?: Routine;
  public calendar: CalendarModel;
  public steps: {
    category: Category;
    products: Product[];
    relations?: IngredientRelations
  }[] = [];
  selectedStep:
    | {
        category: Category;
        products: Product[];
        isOpen: boolean;
      }
    | undefined;
  constructor(
    protected override renderer: Renderer2,
    private titleService: HeaderTitleService,
    private moment: CalendarService,
  ) {
    super(titleService, renderer);

    this.isEvening = moment.isEvening();
    this.themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
    const iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';
    this.headerOptions = new HeaderOptions(
      'Kalender',
      iconClass,
      this.headerCallback.bind(this)
    );

    const visibleDays = this.moment
      .getVisibleDays(new Date())
      .map((x) => new VisibleDay(x));

    this.calendar = new CalendarModel(visibleDays);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.updateView();
  }

  headerCallback() {
    this.renderer.removeClass(document.body, this.themeClass);
    this.isEvening = !this.isEvening;
    this.themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
    const iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';

    this.titleService.setHeaderOptions(
      new HeaderOptions('Kalender', iconClass, this.headerCallback.bind(this))
    );
    this.renderer.addClass(document.body, this.themeClass);

    this.updateView();
  }

  selectDay(event: MouseEvent, date: Date) {
    this.calendar.visibleDays = this.moment
      .getVisibleDays(date)
      .map((x) => new VisibleDay(x));
    this.updateView();
  }

  apply() {
    this.updateView({ byRelation: true });
  }

  clear() {
    this.updateView();
  }

  private updateView(
    filter: { byRelation: boolean } = { byRelation: false }
  ): void {
    // this.routinesService
    //   .getRoutine(this.isEvening, this.calendar.visibleDays[1].date)
    //   .subscribe({
    //     next: (routine) => {
    //       this.routine = routine;
    //       if (!routine) return;
    //       forkJoin([
    //         this.categoriesService.getAll(),
    //         this.productsService.getAll(),
    //         this.ingredientRelationsService.getByLabel(routine.base),
    //       ]).subscribe({
    //         next: (values) => {
    //           this.buildView(filter, values);
    //         },
    //       });
    //     },
    //   });
  }

  private buildView(
    filter: { byRelation: boolean } = { byRelation: false },
    // values: [CsvCategory[], CsvProduct[], CsvIngredientRelations | undefined]
  ) {
    // const categories = values[0];
    // const relations = values[2];

    // this.steps = [];

    // for (let index = 0; index < categories.length; index++) {
    //   const category = categories[index];
    //   let products: CsvProduct[] = [];

    //   if (category) {
    //     products.push(...this.productsService.getProductsByCategory(
    //       values[1],
    //       category.label
    //     ));
    //   }

    //   if (relations && filter.byRelation) {
    //     products = this.productsService.getProductsForWirkstoff(
    //       products,
    //       relations
    //     );
    //   }

    //   if (products.length > 0) {
    //     this.steps.push({
    //       category: category,
    //       products: products,
    //       relations: relations
    //     });
    //   }
    // }
  }
}
