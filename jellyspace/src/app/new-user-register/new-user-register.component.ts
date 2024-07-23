import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user-register',
  templateUrl: './new-user-register.component.html',
  styleUrls: ['./new-user-register.component.css'],
})
export class NewUserRegisterComponent implements OnInit {
  constructor(private router: Router) {}

  onRadioValue: any;
  radiocheck: boolean = false;
  isFreelance: boolean = false;
  isCompany: boolean = false;
  isBigCompany: boolean = false;

  ngOnInit(): void {
    const userType = localStorage.getItem('newuser');
    switch (userType) {
      case 'freelancer':
        this.isFreelance = true;
        this.radiocheck = true;
        break;
      case 'organization':
        this.isBigCompany = true;
        this.radiocheck = true;
        break;
      case 'company':
        this.isCompany = true;
        this.radiocheck = true;
        break;
      default:
        break;
    }
  }

  onChnageValue(val: any, event: any) {
    this.radiocheck = event.target.checked;
    this.onRadioValue = val;
    localStorage.setItem('accountType', val);
  }

  startFreeTrial() {
    // Redirect to company listing or desired page
    this.router.navigate(['company-list']);
  }
}
