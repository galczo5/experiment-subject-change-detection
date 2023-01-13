import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ time }}</h1>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  time = new Date().toISOString();

  private readonly subject = new Subject();
  private subscription!: Subscription;

  ngOnInit(): void {
    const subject = new Subject();

    this.subscription = subject
      .subscribe(() => {
        this.time = new Date().toISOString();
        console.log('New value', this.time);
      })

    // @ts-ignore
    window['observable'] = subject;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
