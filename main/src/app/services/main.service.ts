import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ActiveUserCount, AdminRoleUserCount, AllUsersCount, DeleteUserResponse, DeleteUsersResponse, ForgotPasswordResponse, GetAllUsersResponse, ResetPasswordResponse, SignInResponse, SignUpResponse, ToggleStatusResponse, UpdateUserResponse, UserRoleUserCount } from '../model/Response';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  signUpUser(formData: any) {
    let API = `/user/signup`;
    return this.http.post<SignUpResponse>(API, formData);
  }

  signInUser(formData: any): Observable<any> {
    let API = `/user/login`;
    return this.http.post<SignInResponse>(API, formData);
  }


  getProfile(){
    let API = `/user/auth/profile`;
    return this.http.get(API);
  }

  updateProfile(id:any, formData:any)
  {
    let API = `/user/update/profile/${id}`;
    return this.http.put(API,formData);
  }

  // get all users without pagination and sorting
  getAllUserss()
  {
    let API = `/user/allUsers`;
    return this.http.get<GetAllUsersResponse>(API)
  }

  // getAllUsers(page,limit,sortOrder)
  // {
  //   let API = `/user/allUsers/${page}&${limit}&${sortOrder}`;
  //   return this.http.get<GetAllUsersResponse>(API)
  // }

  getAllUsers(keyword,page)
  {
    let API = `/user/allUsers?${keyword},${page}`;
    return this.http.get<GetAllUsersResponse>(API)
  }




  forgotPassword(formData:any)
  {
    let API = `/user/forgot-password`;
    return this.http.post<ForgotPasswordResponse>(API,formData);
  }

  resetPassword(formData:any)
  {
    let API = `/user/reset-password`;
    return this.http.post<ResetPasswordResponse>(API,formData);

  }

  getUserRole()
  {
    let API =`/user/roles`;
    return this.http.get(API);
  }

  deleteUser(id:any)
  {
    let API =`/user/delete/${id}`;
    return this.http.delete<DeleteUserResponse>(API,id)
  }
  
  deleteUsers(ids:any){
    const id = ids;
    let API=`/user/delete-multiple`;
    return this.http.post<DeleteUsersResponse>(API,id)
  }

  updateUser(id:string, formData:any)
  {
    let API =`/user/update/${id}`;
    return this.http.put<UpdateUserResponse>(API,formData);
  }

  toggleStatus(id:any)
  {
    let API = `/user/toggleUserStatus/${id}`;
    return this.http.post<ToggleStatusResponse>(API,id);
  }

  // users count

  getUserCount()
  {
    let API = `/user/allUsersCount`;
    return this.http.get<AllUsersCount>(API);
  }

  getAdminRoleUserCount()
  {
    let API = `/user/adminUsersCount`;
    return this.http.get<AdminRoleUserCount>(API);
  }
  
  getUserRoleUserCount()
  {
    let API = `/user/userRoleUsersCount`;
    return this.http.get<UserRoleUserCount>(API);
  }

  getActiveUserCount()
  {
    let API = `/user/activeUsersCount`;
    return this.http.get<ActiveUserCount>(API);
  }

}
