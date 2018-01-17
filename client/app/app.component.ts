import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {


  //
  constructor(public auth: AuthService, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

}
