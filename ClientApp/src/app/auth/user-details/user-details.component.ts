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
  }
  updateUserDetails() {
    var decodedToken = this._authService.getDecodedToken();
    this._authService.addUserDetails(this.userDetails).subscribe(response => { return true; })
    this._authService.getUser(decodedToken.id).subscribe((data: any) => this.user = data);
  }
}
