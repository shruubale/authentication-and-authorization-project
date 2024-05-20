import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  constructor(private route: Router,private dialog : MatDialog,private breakpointObserver: BreakpointObserver,
    private service: MainService, private snackBar: MatSnackBar , private authService:AuthService
  ) { }

  name = localStorage.getItem("firstName");
  getLogInUserImage()
  {
    let Avtar =localStorage.getItem("file");
    let url = `http://localhost:3000/${Avtar}`
      return url;
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("status");
    localStorage.removeItem("file");
    localStorage.removeItem("email");
    localStorage.removeItem("lastName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("OTP");
    this.openSnackBar("Log Out")
    this.route.navigate(['/authentication/login']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000 });
  }
}
