import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CryptoHelper } from '../common/services/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private cryptohelper = new CryptoHelper(environment.salt, environment.secretKey, environment.iv);
  constructor(private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let payload: any = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('username');
    if(!payload)
      this.router.navigate(['/login']);
    payload = this.cryptohelper.decrypt(payload as string);
    payload = JSON.parse(payload);
    
    if(username != payload.username)
      sessionStorage.clear();

    return true;
  }
  
}
