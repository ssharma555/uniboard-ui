import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  secMessage: string;
  profileImg: string;
  name: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    private userService: UserService
  ) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.secMessage = data.secMessage;
    this.profileImg = this.userService.getUser().profile_img;
    this.name = this.userService.getUser().name;
  }

  ngOnInit() {}

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {
  constructor(public title: string, public message: string, public secMessage: string) {}
}
