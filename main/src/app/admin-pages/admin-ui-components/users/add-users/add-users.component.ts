import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/Validators/passwordMatch';
import { pastDateValidator } from 'src/app/Validators/pastDate';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {
  hide = true;
  AddUser: FormGroup;
  selectedFile: File;
  arrResponse :any = [];
  constructor(private route: Router, private formBuilder: FormBuilder, private service: MainService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.AddUser = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      dob: ['', [Validators.required, pastDateValidator]],
      zipCode: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required],
      file: ['', Validators.required],
      role:['',Validators.required]
    }, {
      validator: [passwordMatchValidator('password', 'cpassword'),

      ]
    })

    console.log(this.AddUser);
    this.getRoleDropdownList()
  }


  getData() {
    const formData = {
      firstName: this.AddUser.controls['firstName'].value,
      lastName: this.AddUser.controls['lastName'].value,
      email: this.AddUser.controls['email'].value,
      address: this.AddUser.controls['address'].value,
      zipCode: this.AddUser.controls['zipCode'].value,
      dob: this.AddUser.controls['dob'].value,
      password: this.AddUser.controls['password'].value,
      cpassword: this.AddUser.controls['cpassword'].value,
      role:this.AddUser.controls['role'].value
    }
    return formData;
  }


  getControl(name: any): AbstractControl | null {
    return this.AddUser.get(name);
  }

  addUser() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const userData = this.getData();
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });

    if (formData) {
      this.service.signUpUser(formData).subscribe((res) => {
        this.openSnackBar("User Added Successfully");
        console.log(res);
        console.log(formData)
        this.route.navigateByUrl('/admin/admin-ui-components/users');
      })
    }
    else if (this.AddUser.invalid) {
      this.openSnackBar("Please fil the required fields");
    }
    else {
      this.openSnackBar("Something Went Wrong")
    }
  }


  getRoleDropdownList()
  {
    this.service.getUserRole().subscribe((res)=>{
      this.arrResponse = res;
      console.log(res);
    })
  }


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000,});
  }
}
