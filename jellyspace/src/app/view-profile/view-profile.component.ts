import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  userProfile = {
    name: 'John Do',
    position: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  // Company Information
  companyInfo = {
    name: 'Tech Solutions Inc.',
    logo: 'assets/images/company-logo.png', // Adjust path to your logo image
    location: '123 Tech Lane, Silicon Valley, CA',
    contact: 'contact@techsolutions.com',
    size: '500 employees',
    established: '2005',
    revenue: '$50M',
    marketSegments: ['Commercial Aviation', 'Military', 'Space Exploration'],
    partnerships: ['NASA', 'Boeing'],
    certifications: ['ISO 9001', 'AS9100'],
    technologyFocus: ['Advanced Aerospace Technologies'], // Changed to an array
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AppService
  ) {}

  verificationList: any = [];
  skillsList: any = [];
  email: any;
  fname: any;
  lname: any;
  image: any;
  dummyImage: string = 'https://jellyspace-public.s3.amazonaws.com/avatar.png';
  loginEmail: any;
  editData: boolean = false;
  normalData: boolean = true;

  descriptionData =
    'I have good knowledge for html, css, ajax, javascript, bootstrap, jquery';

  ngOnInit(): void {
    this.loginEmail = localStorage.getItem('userEmail');
    this.loginUserDetails();
    this.verificationList = [
      { title: 'Preferred Freelancer', icon: 'fa fa-user' },
      { title: 'Identity Verified', icon: 'fa fa-user-times' },
      { title: 'Payment Verified', icon: 'fa fa-shield' },
      { title: 'Phone Verified', icon: 'fa fa-phone' },
      { title: 'Email Verified', icon: 'fa fa-envelope' },
      { title: 'Facebook Connected', icon: 'fa fa-facebook' },
    ];
  }

  loginUserDetails() {
    const params = {
      email: this.loginEmail || '',
    };
    this.service.loginUserDetails(params).subscribe((data: any) => {
      console.log(data);
      if (data.status === true) {
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userId', data.data._id);
        this.email = data.data.email;
        this.fname = data.data.firstName;
        this.lname = data.data.lastName;
        this.skillsList = data.data.skills;
        this.image = data.data.image;
      } else {
        alert(data.message);
      }
      console.log(data);
    });
  }

  editProfile() {
    this.editData = !this.editData;
    this.normalData = !this.normalData;
  }

  close() {
    this.router.navigate(['dashboard']);
  }
}
