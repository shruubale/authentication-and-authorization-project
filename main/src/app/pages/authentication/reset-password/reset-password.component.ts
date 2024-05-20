import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm:FormGroup;
  hide = true;
  
  constructor(private fb:FormBuilder , private route:Router,private snackBar: MatSnackBar , private service:MainService){}
  
  ngOnInit(){
      this.resetPasswordForm = this.fb.group({
        email:this.email,
        otp:[null,[Validators.required]],
        password:['',[Validators.required, Validators.minLength(6)]],
        cpassword:['',[Validators.required]]
      })
  }
  
  email = localStorage.getItem('email');
  code =localStorage.getItem('OTP')
  
  resetPassword()
  {
    if(this.resetPasswordForm.valid)
      {
        console.log(this.resetPasswordForm.value);
        this.service.resetPassword(this.resetPasswordForm.value).subscribe((res)=>{
          this.openSnackBar(res.message);
          this.route.navigate(['/authentication/login'])
        })
      }
  }
  
  
  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000, });
  }
  
}
