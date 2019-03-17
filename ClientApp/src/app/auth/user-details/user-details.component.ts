import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../../models/user-details'
import { AuthService } from '../auth.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetails: UserDetails;
  user: User;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    var decodedToken = this._authService.getDecodedToken();
    this._authService.getUser(decodedToken.id).subscribe(async (data: User) => {
      this.user = await data
      if(this.user.user_info_id){
      this._authService.getUserDetails(this.user.user_info_id).subscribe(
        (data: UserDetails) => {
          this.userDetails = data;
        }
      );
      }else{
        this.userDetails = new UserDetails;
      }
    }
    );
  }
  /* constructor(private _authService: AuthService) { this.userDetails = new UserDetails }
 
   ngOnInit() {
     var decodedToken = this._authService.getDecodedToken();
     this._authService.getUser(decodedToken.id).subscribe(async (data: User) => {
       this.user = await data
       if (!this.user.user_info_id) {
         this._authService.getUserDetails(decodedToken.id).subscribe(
           (data: UserDetails) => {
             if (!data) this.userDetails = data
           }
         );
       }
     }
     );
   }*/
  async updateUserDetails() {
    var decodedToken = this._authService.getDecodedToken();
    this._authService.addUserDetails(this.userDetails).subscribe(async (data: number) => {
      var userInfo = await data;
      this.user.user_info_id = userInfo["id"];
      this._authService.updateUser(decodedToken.id, this.user).subscribe();
    });
  }
}
