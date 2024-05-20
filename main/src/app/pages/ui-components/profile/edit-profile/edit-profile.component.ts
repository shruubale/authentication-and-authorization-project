import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  userId
constructor(private route: ActivatedRoute){}

ngOnInit(){
  this.userId = +this.route.snapshot.paramMap.get('ite._id');
  console.log(this.userId);
  console.log(this.route);
}

}
