import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../common/models/common';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private toastService: ToastrService, private router: Router) { }

  ngOnInit(): void {}

  public register(){
    if(!this.registrationForm.valid)
      return ;

    let payload = {
      name: this.registrationForm.value.name,
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
    };

    this.authService.register(payload as IUser).subscribe(result=>{
      if(result.success){
        this.toastService.success(result.message);
        this.router.navigate(['/login']);
      }
      else 
        this.toastService.error(result.message);
    });
  }

}
