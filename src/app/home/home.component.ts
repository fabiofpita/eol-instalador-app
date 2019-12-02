import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ordens: any[];

  constructor(private _api: ApiService) {
  }

  ngOnInit() {

    this._api.getOrdensServico()
      .subscribe(res => {
        this.ordens = res;
        console.log(this.ordens);
      }, err => {
        console.log(err);
      });
  }

}
