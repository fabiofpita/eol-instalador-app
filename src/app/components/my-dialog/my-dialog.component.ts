import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ServiceOrder } from 'src/app/model/serviceOrder';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {

  modalTitle: string;
  modalText: string;
  ordemServico: ServiceOrder;
  finalizar: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modalText = data.text;
    console.log(data)
  }

  ngOnInit() {
  }

}
