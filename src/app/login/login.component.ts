import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { throwError } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit{
  invalidLogin: boolean; 
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: any;

  constructor(
     private router: Router, 
     private authService: AuthService,
     private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  // login(username: string, password: string) {
  //   this.authService.login(username, password).subscribe(
  //     success => this.router.navigate(['movies']),
  //     error => this.error = error
  //   );
  // }

 
  //  this.authService.logout();

  //  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }
    
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      success => this.router.navigate(['movies']),
      error => this.error = error 
    )
  
}


}
