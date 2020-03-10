import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Release } from '@app/models/api.models';
import { ApiService } from '@app/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-release-details',
  templateUrl: './release-details.component.html',
  styleUrls: ['./release-details.component.scss']
})
export class ReleaseDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: ApiService, private datePipe: DatePipe) {}
  routerSub: Subscription;
  id: string;
  releaseDetails: Release;

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(routeParams => {
      this.id = routeParams['id'];
      this.apiService.getReleaseDetails(this.id).subscribe(release => {
        console.log(release);
        this.releaseDetails = release;
        this.createTimeLine();
      });
    });
  }

  createTimeLine() {}
}
