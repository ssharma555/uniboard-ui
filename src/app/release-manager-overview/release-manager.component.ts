import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReleaseAddFormComponent } from './release-add-form/release-add-form.component';
import { Release } from '@app/models/api.models';
import { ApiService } from '@app/services/api.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-release-manager',
  templateUrl: './release-manager.component.html',
  styleUrls: ['./release-manager.component.scss']
})
export class ReleaseManagerComponent implements OnInit {
  ongoingRelease: Release[] = [];
  completedRelease: Release[] = [];
  releaseSub: Subscription;
  isLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.releaseSub = this.apiService.getRelease().subscribe(release => {
      this.isLoading = false;
      var tempList = release;

      tempList.forEach((r: Release) => {
        r.requirementFreeze = new Date(r.requirementFreeze);
        r.featureFreeze = new Date(r.featureFreeze);
        r.codeFreeze = new Date(r.codeFreeze);
        r.releaseDate = new Date(r.releaseDate);
        r.phase = this.findReleasePhase(r);
        if (r.released) {
          this.completedRelease.push(r);
        } else {
          this.ongoingRelease.push(r);
        }
      });
    });
  }

  ngOnDestroy() {
    this.releaseSub.unsubscribe();
  }

  findReleasePhase(release: Release) {
    const date = new Date();
    if (release.requirementFreeze.getTime() > date.getTime()) {
      return 'Requirement Gathering';
    } else if (release.featureFreeze.getTime() > date.getTime()) {
      return 'Under Development';
    } else if (release.codeFreeze.getTime() > date.getTime()) {
      return 'Under Testing';
    } else if (release.releaseDate.getTime() > date.getTime()) {
      return 'Testing Completed';
    } else if (date.getTime() > release.releaseDate.getTime()) {
      return 'Product Released';
    }
  }

  addReleaseForm(data: any = {}) {
    const dialogRef = this.dialog.open(ReleaseAddFormComponent, {
      data: data,
      width: '800px',
      height: '800px'
    });

    return dialogRef.afterClosed();
  }

  addRelease(data = {}) {
    this.addReleaseForm(data).subscribe((release: Release) => {
      if (release) {
        console.log(release);
        release.phase = this.findReleasePhase(release);
        this.ongoingRelease.unshift(release);
      }
    });
  }

  cloneRelease(release: Release) {
    delete release.id;
    this.addRelease(release);
  }

  showUpdatedItem(newItem: Release) {
    let updateItem = this.ongoingRelease.find(x => x.id === newItem.id);
    let index = this.ongoingRelease.indexOf(updateItem);
    this.ongoingRelease[index] = newItem;
    this.ongoingRelease[index].phase = this.findReleasePhase(this.ongoingRelease[index]);
  }

  editRelease(release: Release) {
    this.addReleaseForm(release).subscribe((updatedRelease: Release) => {
      if (updatedRelease) {
        console.log(updatedRelease);
        this.showUpdatedItem(updatedRelease);
      }
    });
  }

  deleteRelease(release: Release) {
    this.ongoingRelease = this.ongoingRelease.filter(item => item.id !== release.id);

    console.log('release id = ', release.id);
    this.apiService.deleteRelease(release.id).subscribe(() => {
      console.log('Deleted');
      this.notification.showNotification('Deleted Successfully');
    });
  }

  goToReleaseDetails(release: Release) {
    this.router.navigateByUrl('/release/' + release.id.replace('#', ''));
  }

  confirmDialog(release: Release): void {
    const message = 'Are you sure you want Delete ';
    const secMessage = release.releaseName;

    const dialogData = new ConfirmDialogModel('Delete Release - ' + secMessage, message, secMessage);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '800px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      var result = dialogResult;
      if (result) {
        this.deleteRelease(release);
      }
    });
  }
}
