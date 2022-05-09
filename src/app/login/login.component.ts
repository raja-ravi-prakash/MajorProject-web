import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  public password: string = "";

  constructor(private authService: AuthService, private toastService: ToastrService, private router: Router) { }

  ngOnInit(): void {}

  private handleToken(token: string, username: string){
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
  }

  public login(){
    this.authService.login(this.username, this.password).subscribe(result=>{
      if(result.success){
        this.toastService.success(result.message);
        this.handleToken(result.data.token.payload, result.data.token.username);
        sessionStorage.setItem('rootEntity', JSON.stringify(result.data.rootEntity));
        this.router.navigate(['/home']);
      }
      else {
        this.toastService.error(result.message);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
      }
    })
  }

}
