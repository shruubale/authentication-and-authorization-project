import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  hide = true;
  LoginForm: FormGroup;
  constructor(private route: Router, private authService: AuthService, private formBuilder: FormBuilder, private dialog: MatDialog, private service: MainService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: ['shru@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    })

    console.log(this.LoginForm);
  }


  getData() {
    const formData = {
      email: this.LoginForm.controls.value,
      password: this.LoginForm.controls.value
    }
    return formData
  }

  routeToPath(path) {
    this.route.navigate([path]);
  }

  signIn() {
    if (this.LoginForm.valid) {
      this.service.signInUser(this.LoginForm.value).subscribe(
        (res) => {
          // this.openSnackBar(res.message);
          this.openSnackBar("Login Successfully");
          localStorage.setItem("token", res.dataa.token);
          localStorage.setItem("email", res.dataa.user.email);
          localStorage.setItem("file", res.dataa.user.file);
          localStorage.setItem("role", res.dataa.user.role);
          localStorage.setItem("status", res.dataa.user.status);
          localStorage.setItem("firstName", res.dataa.user.firstName);
          localStorage.setItem("lastName", res.dataa.user.lastName)
          console.log(res.dataa.user.role);
          console.log(res);
          
          if(res.dataa.user.status ==false)
            {
              this.openSnackBar("Admin Blocked You ... You are not able to login to dashboard");
            }
         
          if(res.dataa.user.role == "ADMIN")
            {
              this.route.navigate(['/admin/admin-dashboard'])
            }
            else{
              this.route.navigate(['/dashboard']);
            }
          
            
        },
        (error) => {
          if (error.status === 401) {
            this.openSnackBar("Invalid credentials");
          } else {
            this.openSnackBar("Something Went Wrong");
          }
        }
      );
    } else {
      this.openSnackBar("Something Went Wrong");
    }
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000, });
  }

}
