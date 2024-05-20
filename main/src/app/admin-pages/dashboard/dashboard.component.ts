import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  allUsersCount: number;
  userRoleCount: number;
  adminRoleCount: number;
  activeUserCount: number;
  constructor(private service: MainService) { }

ngOnInit() {
  this.getAllUserCount();
  this.getUserRoleCount();
  this.getAdminRoleCount();
  this.getActiveUserCount();
}

  getAllUserCount()
  {
    this.service.getUserCount().subscribe((res)=>{
      this.allUsersCount = res.User_Count
      console.log("All Users Count",this.allUsersCount);
      
    })
  }

  getUserRoleCount()
  {
    this.service.getUserRoleUserCount().subscribe((res)=>{
      this.userRoleCount = res.UserRole_User_Count;
      console.log("User Role Count",this.userRoleCount);
      
    })
  }

  getAdminRoleCount()
  {
    this.service.getAdminRoleUserCount().subscribe((res)=>{
      this.adminRoleCount = res.Admin_User_Count;
      console.log("Admin Role Count",this.adminRoleCount);
    })
  }

  getActiveUserCount()
  {
    this.service.getActiveUserCount().subscribe((res)=>{
      this.activeUserCount = res.Active_User_Count;
      console.log("Active User Count", this.activeUserCount);
      
    })
  }

}
