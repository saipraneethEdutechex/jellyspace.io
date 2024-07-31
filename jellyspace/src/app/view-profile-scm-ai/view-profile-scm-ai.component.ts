import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'SCM-Profile',
  templateUrl: './view-profile-scm-ai.component.html',
  styleUrls: ['./view-profile-scm-ai.component.css'],
})
export class ViewSCMProfileComponent implements OnInit {
  verificationList: any[] = [];
  skillsList: any[] = [];
  email: string = '';
  fname: string = '';
  lname: string = '';
  image: string = '';
  dummyImage: string = 'https://jellyspace-public.s3.amazonaws.com/avatar.png';
  loginEmail: string = '';
  editData: boolean = false;
  normalData: boolean = true;
  descriptionData: string =
    'I have good knowledge of HTML, CSS, AJAX, JavaScript, Bootstrap, jQuery';

  sections = [
    {
      title: 'Portfolio Items',
      manage: 'Manage',
      image: '../../assets/illustration.svg',
      emptyMessage: 'No portfolio items have been added yet',
      items: [],
    },
    {
      title: 'Reviews',
      image: '../../assets/reviews1.png',
      emptyMessage: 'No reviews to see here!',
      items: [],
    },
    {
      title: 'Experience',
      manage: 'Add Experience',
      image: '',
      emptyMessage: 'No experiences have been added.',
      items: [],
    },
    {
      title: 'Education',
      manage: 'Add Education',
      image: '',
      emptyMessage: 'No education information has been added.',
      items: [],
    },
    {
      title: 'Qualifications',
      manage: 'Add Qualification',
      image: '',
      emptyMessage: 'No qualifications have been added.',
      items: [],
    },
    {
      title: 'Publications',
      manage: 'Add Publication',
      image: '',
      emptyMessage: 'No publications have been added.',
      items: [],
    },
  ];

  sidebarSections = [
    {
      title: 'Verifications',
      image: '',
      emptyMessage: '',
      button: '',
      items: this.verificationList,
    },
    {
      title: 'Certifications',
      image: '../../assets/certifications.svg',
      emptyMessage: "You don't have any certifications yet.",
      button: 'Get Certified',
      items: [],
    },
    {
      title: 'Top Skills',
      image: '',
      emptyMessage: '',
      button: 'Edit Skills',
      items: this.skillsList,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AppService
  ) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('userEmail');
    this.loginEmail = storedEmail ? storedEmail : '';
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
      email: this.loginEmail,
    };
    this.service.loginUserDetails(params).subscribe((data: any) => {
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
    });
  }

  editProfile() {
    this.editData = !this.editData;
    this.normalData = !this.normalData;
  }

  closeSCM() {
    this.router.navigate(['home']);
  }
}
