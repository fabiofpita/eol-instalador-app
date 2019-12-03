import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AutenticacaoService } from '../service/autenticacao.service';
import { ServiceOrder } from '../model/serviceOrder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ordens: ServiceOrder[];

  constructor(
    private _api: ApiService,
    private _autenticacao: AutenticacaoService,
    private router: Router) {
  }

  ngOnInit() {

    this._api.getOrdensServicoAbertas()
      .subscribe(res => {
        this.ordens = res;
        console.log(this.ordens);
      }, err => {
        console.log(err);
      });
  }

  logout() {
    this._autenticacao.logout();
    this.router.navigate(["/login"]);
  }

}
