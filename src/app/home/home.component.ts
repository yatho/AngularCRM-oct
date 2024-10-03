import { Component, inject } from '@angular/core';
import { DemoObservableService } from '../common/demo-observable.service';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  demoObs = inject(DemoObservableService);

  testObservable(): void {
    const obs: Observable<number> = this.demoObs.getObservable();

    const subscription = obs.subscribe((result: number) => {
      console.log('result = ', result);
    });

    setTimeout(() => {
      subscription.unsubscribe();
    }, 1500);
  }
}
