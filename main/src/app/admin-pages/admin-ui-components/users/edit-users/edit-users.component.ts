import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent {
  constructor(private route: Router, 
    private formBuilder: FormBuilder, 
    private service: MainService, 
    private snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<EditUsersComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any  
  ) { }

  updateUser: FormGroup;
  Details: any;
  selectedFile: File;
  arrResponse :any = [];
  ngOnInit() {
    this.Details = this.data.Details;
    console.log(this.data.Details);
    this.updateUser = this.formBuilder.group({
      firstName: [this.data.firstName],
      lastName: [this.data.lastName],
      email: [this.data.email],
      dob: [this.data.dob],
      address:[this.data.address],
      zipCode:[this.data.zipCode],
      role:[this.data.role]
    })  
    this.setFormValues();  
    this.getRoleDropdownList();
  }

  setFormValues() {
    this.updateUser.controls['firstName'].setValue(this.Details.firstName);
    this.updateUser.controls['lastName'].setValue(this.Details.lastName);
    this.updateUser.controls['email'].setValue(this.Details.email);
    this.updateUser.controls['dob'].setValue(this.Details.dob);
    this.updateUser.controls['address'].setValue(this.Details.address);
    this.updateUser.controls['zipCode'].setValue(this.Details.zipCode);
    this.updateUser.controls['role'].setValue(this.Details.role);
  }


  getData() {
    const formData = {
      firstName: this.updateUser.controls.firstName.value,
      lastName: this.updateUser.controls.lastName.value,
      email: this.updateUser.controls.email.value,
      dob: this.updateUser.controls.dob.value,
      address: this.updateUser.controls.address.value,
      zipCode: this.updateUser.controls.zipCode.value,
      role: this.updateUser.controls.role.value,
    }
    return formData;
  }

  getControl(name: any): AbstractControl | null {
    return this.updateUser.get(name);
  }

  update() {
    this.service.updateUser(this.Details._id,this.getData()).subscribe((res)=>{
      console.log(res);
      this.updateUser.reset();
      this.openSnackBar(res.message);
      this.closeDialog();
      this.route.navigate(['/admin/admin-ui-components/users']);
    },)
  }

  getRoleDropdownList()
  {
    this.service.getUserRole().subscribe((res)=>{
      this.arrResponse = res;
      console.log(res);
    })
  }

  routeToPath(path) {
    this.route.navigate([path]);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000 });
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
