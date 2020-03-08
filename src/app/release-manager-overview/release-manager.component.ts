import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReleaseAddFormComponent } from './release-add-form/release-add-form.component';

@Component({
  selector: 'app-release-manager',
  templateUrl: './release-manager.component.html',
  styleUrls: ['./release-manager.component.scss']
})
export class ReleaseManagerComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  addReleaseForm() {
    const dialogRef = this.dialog.open(ReleaseAddFormComponent, {
      width: '650px',
      height: '580px'
    });
  }
}
