import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private dialog :MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }

}
