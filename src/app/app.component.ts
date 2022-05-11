import { Component } from '@angular/core';
import LoadingService from './common/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'c15-frontend';
  public loading: boolean = false;
  
  constructor(){
    LoadingService.loadingEvent.subscribe(result=>{
      this.loading = result;
    });
  }
}
