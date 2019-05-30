import { Component } from '@angular/core';
import { SendEmailService } from '../send-email/send-email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  email: any;
  constructor(private _sendEmailService: SendEmailService) {
    this.email = [];
    this.email[0] = "testWebsiteEmail6765856856@gmail.com";
    this.email[1] = "Twoja przesylka zostala wyslana";
    this.email[2] = "status przesylki";
}
  sendMail(){
    this._sendEmailService.sendEmail(this.email).subscribe();
  }
}
