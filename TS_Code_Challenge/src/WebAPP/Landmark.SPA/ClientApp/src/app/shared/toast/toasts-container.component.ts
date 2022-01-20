﻿import { Component, TemplateRef } from '@angular/core';

import { ToastService } from './toast.service';


@Component({
    selector: 'app-toasts',
    template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      header="Success"
      [autohide]="true"
      [delay]="toast.delay || 20000"
      (hide)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
    // tslint:disable-next-line: no-host-metadata-property
    host: { '[class.ngb-toasts]': 'true' }
})
// tslint:disable-next-line: component-class-suffix
export class ToastsContainer {
    constructor(public toastService: ToastService) { }

    isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
