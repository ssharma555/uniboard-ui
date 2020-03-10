import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReleaseAddFormComponent } from './release-add-form/release-add-form.component';
import { Release } from '@app/models/api.models';
import { ApiService } from '@app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-release-manager',
  templateUrl: './release-manager.component.html',
  styleUrls: ['./release-manager.component.scss']
})
export class ReleaseManagerComponent implements OnInit {
  releaseList: Release[];
  releaseSub: Subscription;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit() {
    this.releaseSub = this.apiService.getRelease().subscribe(release => {
      this.releaseList = release;
      console.log(this.releaseList);
    });
  }

  ngOnDestroy() {
    this.releaseSub.unsubscribe();
  }

  addReleaseForm() {
    const dialogRef = this.dialog.open(ReleaseAddFormComponent, {
      width: '650px',
      height: '580px'
    });
  }
}
