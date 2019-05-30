import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private http: Http) { }

  sendEmail(email){
    console.log("wyslano email");
    console.log(email);
    return this.http.post("api/Send_email", email);
  }
}
