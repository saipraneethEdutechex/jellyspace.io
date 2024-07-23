import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  editData:boolean = false;
  // overViewData: any;
  normalData: boolean = true;
  companyData = '1,001 - 5,000 employees';
  headqutrData = 'Hawthorne, California';
  foundedData = '2002';
  specialData = 'Advance Rockets and Spacecraft , high performance heat shield material, and Satellite Development';
  productData = 'Falcon 9 and Falcon Heavy Rockets, Dragon Cargo and Crew Spacecraft, Merlin Rocket Engines, Draco and SuperDraco Thrusters, PICA-X'
  websiteData = 'http://www.spacex.com';
  industryData = 'Aviation and Aerospace Component Manufacturing';
  overViewData = 'Space)Sdesigns, manufactures and launches the worlds most advanced rockets and spacecraft. The company was founded A 2002 by Elon Musk to revolutionize space transportation'

  loginEmail:any;
  image:any
  constructor( private service:AppService,  private router: Router) { }

  ngOnInit(): void {
    this.loginEmail = localStorage.getItem('userEmail');
    this.companyDetails();
  }

  setDefault(){
    this.image="/assets/img/avatar.png";
  }

  companyDetails() {
    const params ={
      "email": this.loginEmail || '',
    }
    this.service.loginUserDetails(params).subscribe((data: any) => {
      console.log(data)
      if(data.status === true) {
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userId', data.data._id);
        // this.accountType =  data.data.accountType;
        // this.email =  data.data.email;
        // this.fname =  data.data.firstName;
        // this.lname =  data.data.lastName;
        // this.skillList =  data.data.skills;
        this.image = data.data.image;
      } else {
        alert(data.message);
      }
      // console.log(data);
    })
  }

  editProfile() {
    // this.editData = true;
    // this.normalData = false;
    this.editData = !this.editData
    this.normalData = !this.normalData;
  }
  close(){
    this.router.navigate(['dashboard']);
  }

}
