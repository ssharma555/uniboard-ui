import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BuildInfo, AutoSuggest, Info, Filter, Release, KeyValueHolder } from '@app/models/api.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 1000,
      verticalPosition: 'top'
      // horizontalPosition: 'end'
    });
  }
}
