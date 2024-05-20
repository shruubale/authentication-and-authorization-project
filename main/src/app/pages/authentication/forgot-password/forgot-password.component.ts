import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: Router, private service: MainService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid)
      this.service.forgotPassword(this.forgotPasswordForm.value).subscribe((res) => {
        this.openSnackBar(res.message);
        localStorage.setItem('OTP',JSON.stringify(res.user.otp));
        localStorage.setItem('email',res.user.email);
        this.route.navigate(['/authentication/reset-password'])
      })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000, });
  }
}
