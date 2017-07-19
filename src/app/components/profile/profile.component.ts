import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BackendService } from '../../services/backend.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  currentUserId: string;
  currentUserType: string;
  reviews: any[];
  stars = '★';
  constructor(private activatedRoute: ActivatedRoute, private bcService: BackendService,
  private router: Router) { }
  // Get params
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const filter: string = params['id'];
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