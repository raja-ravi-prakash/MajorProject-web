import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CryptoHelper } from '../common/services/crypto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-state',
  templateUrl: './auth-state.component.html',
  styleUrls: ['./auth-state.component.scss']
})
export class AuthStateComponent implements OnInit {

  constructor(private router: Router) { }
  private cryptohelper = new CryptoHelper(environment.salt, environment.secretKey, environment.iv);


  ngOnInit(): void {
    let payload: any = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('username');
    if(!payload)
      this.router.navigate(['/login']);
    payload = this.cryptohelper.decrypt(payload as string);
    payload = JSON.parse(payload);
    
    if(username != payload.username){
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
    this.router.navigate(['/home']);
  }

}
