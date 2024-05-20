import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { pastDateValidator } from 'src/app/Validators/pastDate';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./resister.component.css']
})
export class AppSideRegisterComponent {
  hide = true;
  ResisterForm: FormGroup;
  selectedFile: File;
  arrResponse: any = [];
  selectedImageData: string;
  // selectedImage: string | ArrayBuffer;
  constructor(private route: Router, private formBuilder: FormBuilder, private service: MainService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.ResisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      dob: ['', [Validators.required, pastDateValidator]],
      zipCode: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required],
      file: ['', Validators.required],
      role: ['USER', Validators.required]
    },
      // {
      //   validator: [passwordMatchValidator('password', 'cpassword'),

      //   ]
      // }
    )

    console.log(this.ResisterForm);
    this.getRoleDropdownList()
  }


  getData() {
    const formData = {
      firstName: this.ResisterForm.controls['firstName'].value,
      lastName: this.ResisterForm.controls['lastName'].value,
      email: this.ResisterForm.controls['email'].value,
      address: this.ResisterForm.controls['address'].value,
      zipCode: this.ResisterForm.controls['zipCode'].value,
      dob: this.ResisterForm.controls['dob'].value,
      password: this.ResisterForm.controls['password'].value,
      cpassword: this.ResisterForm.controls['cpassword'].value,
      role: this.ResisterForm.controls['role'].value
    }
    return formData;
  }


  getControl(name: any): AbstractControl | null {
    return this.ResisterForm.get(name);
  }




  resister() {
    const formData = new FormData();


    const userData = this.getData();
    console.log(userData);

    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });
    if (this.selectedImage) {
      formData.append('file', this.selectedImage, this.selectedImage.name);
    }

    if (formData) {
      this.service.signUpUser(formData).subscribe((res) => {
        console.log(formData);

        this.openSnackBar("Resistered Successfully");
        console.log(res);
        console.log(formData)
        this.route.navigateByUrl('/authentication/login');
      })
    }
    else if (this.ResisterForm.invalid) {
      this.openSnackBar("Please fil the required fields");
    }
    else {
      this.openSnackBar("Something Went Wrong")
    }
  }


  getRoleDropdownList() {
    this.service.getUserRole().subscribe((res) => {
      this.arrResponse = res;
      console.log(res);
    })
  }


  // onFileSelected(event) {
  //   this.selectedFile = <File>event.target.files[0];
  // }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000, });
  }



  // onFileSelected(event) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.selectedImage = reader.result;
  //     }
  //     reader.readAsDataURL(file);
  //   }
  // }



  selectedImage: File;

  onFileSelected(event) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageData = reader.result as string;
      }
      reader.readAsDataURL(this.selectedImage);
    }
  }











}
function passwordMatchValidator(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}

