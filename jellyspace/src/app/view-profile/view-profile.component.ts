import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service:AppService,
  ) { }
  verificationList: any = [];
  skillsList: any = [];
  email: any;
  fname: any;
  lname: any;
  image: any;
  dummyImage:string = 'https://jellyspace-public.s3.amazonaws.com/avatar.png';
  loginEmail: any;
  editData: boolean = false;
  normalData: boolean = true;

  // setDefault(){
  //   this.dummyImage="https://jellyspace-public.s3.amazonaws.com/avatar.png";
  // }

  descriptionData = 'I have good knowledge for html,css,ajax, javascript,bootstrap,jquery'

  ngOnInit(): void {
    this.loginEmail = localStorage.getItem('userEmail');
    // this.route.queryParams.subscribe(params => {
    //   this.email = params['email'];
    //   this.fname = params['fname'];
    //   this.lname = params['lname'];
    //   this.skillsList = params['skill']
    //   });
    this.loginUserDetails();
    this.verificationList = [
      {title:'Preferred Freelancer', icon:'fa fa-user'},
      {title:'Identity Verified', icon:'fa fa-user-times'},
      {title:'Payment Verified', icon:'fa fa-shield'},
      {title:'Phone Verified', icon:'fa fa-phone'},
      {title:'Email Verified', icon:'fa fa-envelope'},
      {title:'Facebook Connected', icon:'fa fa-facebook'},
    ];
    // this.skillsList = [
    //   {title:'HTML', icon:'fa fa-user'},
    //   {title:'CSS', icon:'fa fa-user-times'},
    //   {title:'JAVA SCRIPT', icon:'fa fa-shield'},
    //   {title:'PHP', icon:'fa fa-phone'},
    //   {title:'Larvel', icon:'fa fa-envelope'}
    // ];
  }

  loginUserDetails() {
    const params ={
      "email": this.loginEmail || '',
    }
    this.service.loginUserDetails(params).subscribe((data: any) => {
      console.log(data)
      if(data.status === true) {
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userId', data.data._id);
        // this.accountType =  data.data.accountType;
        this.email =  data.data.email;
        this.fname =  data.data.firstName;
        this.lname =  data.data.lastName;
        this.skillsList =  data.data.skills
        this.image = data.data.image;
      } else {
        alert(data.message);
      }
      console.log(data);
    })
  }

  editProfile() {
    // this.editData = true;
    // this.normalData = false;
    this.editData = !this.editData;
    this.normalData = !this.normalData;
  }
  close(){
    this.router.navigate(['dashboard']);
  }

}
