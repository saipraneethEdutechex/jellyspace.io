import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  profileData = {
    fname: '',
    lname: '',
    email: '',
    companySize: '',
    yearEstablished: '',
    // Add other fields as needed
  };
  selectedSection: string = 'personal-info'; // Default section

  constructor(private router: Router, private service: AppService) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData() {
    // Fetch profile data from the service or localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.service.loginUserDetails({ email }).subscribe((data: any) => {
        if (data.status === true) {
          this.profileData = {
            fname: data.data.firstName,
            lname: data.data.lastName,
            email: data.data.email,
            companySize: data.data.companyInfo.size,
            yearEstablished: data.data.companyInfo.established,
            // Map other fields as needed
          };
        } else {
          alert(data.message);
        }
      });
    }
  }

  selectSection(section: string) {
    this.selectedSection = section;
  }

  savePersonalInfo() {
    // Implement save personal info logic here
    console.log('Personal Info saved:', this.profileData);
    // Optionally navigate back to view profile or show a success message
    this.router.navigate(['view-profile']);
  }

  saveCompanyInfo() {
    // Implement save company info logic here
    console.log('Company Info saved:', this.profileData);
    // Optionally navigate back to view profile or show a success message
    this.router.navigate(['view-profile']);
  }

  close() {
    this.router.navigate(['view-profile']);
  }
}
