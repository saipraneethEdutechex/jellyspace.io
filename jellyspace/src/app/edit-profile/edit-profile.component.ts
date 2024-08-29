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
    phone: '',
    position: '',
    companyName: '',
    location: '',
    contact: '',
    revenue: '',
    marketSegments: [],
    partnerships: [],
    certifications: [],
    technologyFocus: '',
    keyMarkets: [],
    customerSegments: [],
    competitivePosition: '',
    salesChannels: [],
    productCategories: [],
    productSpecifications: '',
    serviceOfferings: '',
    deliveryAndFulfillment: '',
    customerSupport: '',
    pricingAndPackages: '',
    mission: '',
    vision: '',
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
    kpis: [],
    growthStrategy: '',
  };

  selectedSection: string = 'personal-info'; // Default section
  street: any;
  hNumber: any;
  city: any;
  postalCode: any;
  country: any;
  title: any;
  MobileNo: any;
  url: any;

  constructor(private router: Router, private service: AppService) {}
  verificationList: any = [];
  skillsList: any = [];
  email: string = '';
  fname: string = '';
  lname: string = '';
  image: string | undefined;
  dummyImage: string = 'https://jellyspace-public.s3.amazonaws.com/avatar.png';
  loginEmail: string | null = '';
  editData: boolean = false;
  normalData: boolean = true;

  descriptionData =
    'I have good knowledge for HTML, CSS, AJAX, JavaScript, Bootstrap, jQuery';
  ngOnInit(): void {
    console.log(this.fname);
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
  // localStorage.setItem('nameOTP', `${this.fName} ${this.lName}`);
  // localStorage.setItem('otherFName', this.fName);
  // localStorage.setItem('otherLName', this.lName);
  // localStorage.setItem('othereMail', this.eMail);
  // localStorage.setItem('registerEmail', this.eMail);
  // localStorage.setItem('otherPWord', this.pWord);
  // localStorage.setItem('otherTitle', this.title);
  // localStorage.setItem('otherMobileNo', this.mobileNo);
  // localStorage.setItem('otherImage', this.url);
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
        this.street = data.data.street;
        this.hNumber = data.data.hNumber;
        this.city = data.data.city;
        this.postalCode = data.data.postalCode;
        this.country = data.data.country;
        this.title = data.data.title;
        this.MobileNo = data.data.MobileNo;
        this.url = data.data.url;
      } else {
        alert(data.message);
      }
      console.log(data);
    });
  }
  loadProfileData() {
    const email = localStorage.getItem('userEmail');
    const fname = localStorage.getItem('userFirstName');
    const lname = localStorage.getItem('userLastName');

    if (email) {
      this.service.loginUserDetails({ email }).subscribe((data: any) => {
        if (data.status === true) {
          const userData = data.data;
          this.profileData = {
            ...this.profileData,
            fname: userData.firstName,
            lname: userData.lastName,
            email: userData.email,
            companySize: userData.companyInfo.size || '',
            yearEstablished: userData.companyInfo.established || '',
            phone: userData.phone || '',
            position: userData.position || '',
            companyName: userData.companyInfo.name || '',
            location: userData.companyInfo.location || '',
            contact: userData.companyInfo.contact || '',
            revenue: userData.companyInfo.revenue || '',
            marketSegments: userData.companyInfo.marketSegments || [],
            partnerships: userData.companyInfo.partnerships || [],
            certifications: userData.companyInfo.certifications || [],
            technologyFocus: userData.companyInfo.technologyFocus || '',
            keyMarkets: userData.marketCustomerData.keyMarkets || [],
            customerSegments:
              userData.marketCustomerData.customerSegments || [],
            competitivePosition:
              userData.marketCustomerData.competitivePosition || '',
            salesChannels: userData.marketCustomerData.salesChannels || [],
            productCategories:
              userData.productServicesInfo.productCategories || [],
            productSpecifications:
              userData.productServicesInfo.productSpecifications || '',
            serviceOfferings:
              userData.productServicesInfo.serviceOfferings || '',
            deliveryAndFulfillment:
              userData.productServicesInfo.deliveryAndFulfillment || '',
            customerSupport: userData.productServicesInfo.customerSupport || '',
            pricingAndPackages:
              userData.productServicesInfo.pricingAndPackages || '',
            mission: userData.strategicInformation.missionVision.mission || '',
            vision: userData.strategicInformation.missionVision.vision || '',
            strengths:
              userData.strategicInformation.swotAnalysis.strengths || [],
            weaknesses:
              userData.strategicInformation.swotAnalysis.weaknesses || [],
            opportunities:
              userData.strategicInformation.swotAnalysis.opportunities || [],
            threats: userData.strategicInformation.swotAnalysis.threats || [],
            kpis: userData.strategicInformation.kpis || [],
            growthStrategy: userData.strategicInformation.growthStrategy || '',
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

  saveProfileData() {
    // Implement the logic to save the profile data
    // For now, we are just logging the profile data to the console
    console.log('Profile data to be saved:', this.profileData);
    this.router.navigate(['view-profile']);
  } // Add this for each method
  savePersonalInfo() {
    // Your logic to handle personal info saving
    console.log('Personal Info saved!');
  }

  saveGeneralInfo() {
    // Your logic to handle general info saving
    console.log('General Info saved!');
  }

  saveAvailability() {
    // Your logic to handle availability saving
    console.log('Availability saved!');
  }

  saveProfileKeywords() {
    // Your logic to handle profile keywords saving
    console.log('Profile Keywords saved!');
  }

  saveCompanyInfo() {
    // Your logic to handle company info saving
    console.log('Company Info saved!');
  }

  saveProductInfo() {
    // Your logic to handle product info saving
    console.log('Product Info saved!');
  }

  saveMarketData() {
    // Your logic to handle market data saving
    console.log('Market Data saved!');
  }

  saveStrategicInfo() {
    // Your logic to handle strategic info saving
    console.log('Strategic Info saved!');
  }

  close() {
    this.router.navigate(['view-profile']);
  }
}
