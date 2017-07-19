import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BackendService } from '../../services/backend.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  currentUserUsername:string;
  currentUserId: string;
  currentUserType: string;
  reviews: any[];
  stars = '★';
  userInParmIsSelf = false;
  userIsSelf=false;

  constructor(private activatedRoute: ActivatedRoute, private bcService: BackendService,
  private router: Router) { }
  // Get params
  ngOnInit() {
    this.currentUserUsername= "";
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const filter: string = params['id'];
      this.userIsSelf=false;
      if (filter) {
        this.currentUserId = filter;
        
        console.log("Filtering enabled");
        this.getUser();
      }
      else {
        console.log("Filtering disabled");
        this.currentUserId = localStorage.getItem("id");
        this.currentUserType = localStorage.getItem("id");
        this.getUser();
        this.userInParmIsSelf = false;
        this.userIsSelf=true;
      }
      if (this.currentUserId == localStorage.getItem("id")){
          this.userInParmIsSelf = true;
          this.userIsSelf = true;
        }
    });
  }

  getStars(rating){
    
  }

  getUser() {
    this.bcService.getUserData(this.currentUserId).subscribe(
      (res: any) => {
        this.currentUserType = res[0].userType;
        console.log("Great success:" + res[0].userType);
        this.currentUserUsername = res[0].username;
        this.getReceivedReviews();
      },
      (error) => { console.log(error); }
    );
  }

  getWrittenReviews() {
    // buyer = id
    this.bcService.getUserReviews(this.currentUserId, this.currentUserType).subscribe(
      (res: any[]) => {
        this.reviews=res;
        console.log("Great success:" + this.reviews);
      },
      (error) => { console.log(error); }
    );
  }
  getReviewerProfile(buyerId){
    console.log(`/profile?id=${buyerId}`);
    this.router.navigate(['/profile'], { queryParams: { id: buyerId } });
    // return `/profile?id=${buyerId}`;
  }
  

  getReceivedReviews() {
    // seller  = id
    this.bcService.getUserReviews(this.currentUserId, this.currentUserType).subscribe(
      (res: any) => {
        this.reviews=res;
        console.log("Great success:" + res[0].userType);
      },
      (error) => { console.log(error); }
    );
  }
}