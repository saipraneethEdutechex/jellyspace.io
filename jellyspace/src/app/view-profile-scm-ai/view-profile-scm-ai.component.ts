import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'SCM-Profile',
  templateUrl: './view-profile-scm-ai.component.html',
  styleUrls: ['./view-profile-scm-ai.component.scss'],
})
export class ViewSCMProfileComponent implements OnInit {
  userProfile = {
    name: 'John Doe',
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

  // MarketCustomerData
  MarketCustomerData = {
    keyMarkets: ['North America', 'Europe', 'Asia-Pacific'], // Example markets
    customerSegments: ['OEMs', 'Governmental Agencies', 'Defense Contractors'], // Example segments
    competitivePosition:
      'Leading provider in aerospace technology with a strong foothold in defense and commercial aviation sectors.', // Example position
    salesChannels: [
      'Direct Sales',
      'Online Distribution',
      'Strategic Partnerships',
    ],
  };

  // Product and Services Information
  productServicesInfo = {
    productCategories: ['Aerospace Components', 'Defense Systems'], // Example categories
    productSpecifications: 'High-performance materials, cutting-edge design', // Example specifications
    serviceOfferings: ['Maintenance', 'Repair', 'Overhaul'], // Example services
    deliveryAndFulfillment:
      'Worldwide shipping with expedited options available for urgent needs.', // Example delivery
    customerSupport: '24/7 customer support with dedicated account managers.', // Example support
    pricingAndPackages:
      'Custom pricing based on volume and service level agreements.', // Example pricing
  };

  // Strategic Information
  strategicInformation = {
    missionVision: {
      mission:
        'To innovate and provide advanced aerospace solutions that ensure safety, reliability, and excellence in every mission.',
      vision:
        'To be the world’s leading provider of aerospace technologies, revolutionizing the industry through innovation and customer satisfaction.',
    },
    swotAnalysis: {
      strengths: [
        'Industry-leading technology',
        'Strong customer relationships',
        'Highly skilled workforce',
      ],
      weaknesses: [
        'High dependency on defense contracts',
        'Limited geographic presence',
      ],
      opportunities: [
        'Expansion into emerging markets',
        'Increased demand for commercial space exploration',
      ],
      threats: [
        'Economic downturns',
        'Intense competition from other aerospace companies',
      ],
    },
    kpis: [
      'Revenue Growth',
      'Market Share',
      'Customer Satisfaction Score',
      'Operational Efficiency',
    ],
    growthStrategy:
      'Focus on expanding into new markets, investing in R&D for cutting-edge technology, and forming strategic partnerships to enhance market presence.',
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
    this.router.navigate(['home']);
  }
}
