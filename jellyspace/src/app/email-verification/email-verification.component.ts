import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  timeLeft: number = 60;
  interval: any;

  constructor(
    private service: AppService,
    private router: Router
  ) {
    this.startTimer();
  }
  public fieldTextType: boolean = false;
  public otpText: any;

  ngOnInit(): void {
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000)
  }

  verifyOTP() {

    const params = {
      OTP: this.otpText,
      email: localStorage.getItem('registerEmail')
    }
    this.service.verifyOTP(params).subscribe((data: any) => {
      if (data.status === true) {
        var createParams = {};
        if (localStorage.getItem('accountType') === 'freelancer') {
          var freelancerFirstName = localStorage.getItem('freelancerFirstName');
          var freelancerLastName = localStorage.getItem('freelancerLastName');
          var freelancerEmail = localStorage.getItem('freelancerEmail');
          var freelancerPassword = localStorage.getItem('freelancerPassword');
          var freelancerSkills = JSON.parse(localStorage.getItem('freelancerSkills')!);
          var freelancerImage = localStorage.getItem('freelancerImage');
          createParams = {
            firstName: freelancerFirstName,
            lastName: freelancerLastName,
            email: freelancerEmail,
            password: freelancerPassword,
            skills:freelancerSkills,
            image:freelancerImage,
            accountType: 'freelancer',
          }
        } else {
          var otherFName = localStorage.getItem('otherFName');
          var otherLName = localStorage.getItem('otherLName');
          var othereMail = localStorage.getItem('othereMail');
          var otherPWord = localStorage.getItem('otherPWord');
          var entityName = localStorage.getItem('entityName');
          var dateOfInCorporation = localStorage.getItem('dateOfInCorporation');
          var otherTitle = localStorage.getItem('otherTitle');
          var otherMobileNo = localStorage.getItem('otherMobileNo');
          var otherImage = localStorage.getItem('otherImage');
          var addStreet = localStorage.getItem('street');
          var addhNumber = localStorage.getItem('housenumber');
          var addCity = localStorage.getItem('city');
          var addPosatalCode = localStorage.getItem('postalcode');
          var addCountry = localStorage.getItem('country');
          createParams = {
            firstName: otherFName,
            lastName: otherLName,
            email: othereMail,
            password: otherPWord,
            entityName: entityName,
            dateOfInCorporation: dateOfInCorporation,
            title: otherTitle,
            mobileNo: otherMobileNo,
            image: otherImage,
            street:addStreet,
            h_number:addhNumber,
            city:addCity,
            postalCode:addPosatalCode,
            country:addCountry,
            accountType: localStorage.getItem('accountType'),
          }
        }


        this.service.createEmployee(createParams).subscribe((data: any) => {
          if (data.status === true) {
            localStorage.setItem('entityName', "");
            localStorage.setItem('dateOfInCorporation', "");
            localStorage.setItem('otherFName', "");
            localStorage.setItem('otherLName', "");
            localStorage.setItem('othereMail', "");
            localStorage.setItem('otherPWord', "");
            localStorage.setItem('otherTitle', "");
            localStorage.setItem('otherMobileNo', "");
            localStorage.setItem('otherImage', "");
            localStorage.setItem('registerEmail', "");
            localStorage.setItem('street', "");
            localStorage.setItem('housenumber', "");
            localStorage.setItem('city', "");
            localStorage.setItem('postalcode', "");
            localStorage.setItem('country', "");
            this.router.navigate(['signin']);
          } else {
            alert(data.message);
          }

        })
        console.log(createParams)
      }
      else {
        alert(data.message);
      }
    })
  }

  reSendOTP() {
    const params = {
      email: localStorage.getItem('registerEmail'),
      name: localStorage.getItem('nameOTP')
    }

    this.service.sendOTP(params).subscribe((data: any) => {
      if (data.status === true) {
        this.otpText = '';
        this.timeLeft = 60;
        this.router.navigate(['email-verification'])
      } else {
        alert(data.message);
      }
    });
  }

  backNavigation() {
    if (localStorage.getItem('accountType') === 'freelancer') {
      this.router.navigate(['user-details'])
    } else {
      this.router.navigate(['account-handler'])
    }
  }
}
