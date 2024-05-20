import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {
  arrResponse:any = [];

  constructor(private route: Router, private dialog: MatDialog,
    private service: MainService, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProfileOfUser();
  }

 getProfileOfUser() {
    this.service.getProfile().subscribe((res) => {
      this.arrResponse[0] =res; 
      console.log(res);
    })
  }

  getLogInUserImage()
  {
    let Avtar =localStorage.getItem("file");
    let url = `http://localhost:3000/${Avtar}`
      return url;
  }

  // openDialog(data:any)
  // {
  //   const dialog = this.dialog.open(EditProfileComponent , {
  //     maxWidth:'800px',
  //     width:'400px',
  //     height:'600px',
  //       data:{
  //         Details:data
  //       }
  //   });
  //   dialog.afterClosed().subscribe(result=>{
  
  //   })
  // }
}
