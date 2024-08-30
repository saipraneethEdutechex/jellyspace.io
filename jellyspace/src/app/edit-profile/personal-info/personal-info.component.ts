import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  otpSent: boolean = false;
  otpVerified: boolean = false;
  emailEditable: boolean = false;
  isEditing: boolean = false;
  email: string = '';
  fname: string = '';
  lname: string = '';

  constructor(private router: Router, private service: AppService) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  async loadProfileData() {
    const loginEmail = localStorage.getItem('userEmail');
    if (loginEmail) {
      try {
        const data = await this.service
          .loginUserDetails({ email: loginEmail })
          .toPromise();
        if (data.status) {
          this.fname = data.data.firstName;
          this.lname = data.data.lastName;
          this.email = data.data.email;
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error loading profile data', error);
      }
    }
  }

  async sendOtp() {
    try {
      const data = await this.service
        .sendOTP({ email: this.email })
        .toPromise();
      if (data.status) {
        this.otpSent = true;
        alert('OTP sent to your email!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error sending OTP', error);
    }
  }

  async verifyOtp() {
    try {
      const data = await this.service
        .verifyOTP({ email: this.email, otp: this.otp })
        .toPromise();
      if (data.status) {
        this.otpVerified = true;
        this.emailEditable = true;
        alert('OTP verified successfully!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  }

  async resendOtp() {
    if (!this.otpSent) {
      alert('Please request an OTP first.');
      return;
    }
    await this.sendOtp(); // Reuse sendOtp method
  }
  discardChanges() {}
  editField(field: string) {
    if (this.otpVerified) {
      this.isEditing = true;
    } else {
      alert('Please verify OTP to enable editing.');
    }
  }

  async savePersonalInfo() {
    if (this.isEditing && this.otpVerified) {
      if (this.newPassword === this.confirmPassword) {
        const updatedInfo = {
          fname: this.fname,
          lname: this.lname,
          email: this.email,
          newPassword: this.newPassword,
        };

        try {
          const data = await this.service
            .updatePersonalInfo(updatedInfo)
            .toPromise();
          if (data.status) {
            alert('Personal info updated successfully!');
            this.router.navigate(['view-profile']);
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error updating personal info', error);
        }
      } else {
        alert('Passwords do not match.');
      }
    } else if (!this.otpVerified) {
      alert('Please verify OTP to enable editing.');
    } else {
      alert('Enable editing mode first.');
    }
  }

  close() {
    this.router.navigate(['view-profile']);
  }
}
