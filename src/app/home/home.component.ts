import { Component, OnInit, Directive, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AutenticacaoService } from '../service/autenticacao.service';
import { ServiceOrder } from '../model/serviceOrder';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MyDialogComponent } from '../components/my-dialog/my-dialog.component';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ordens: ServiceOrder[];
  myOrdens: ServiceOrder[];
  screenOrdens: ServiceOrder[];
  currentUser: User;

  constructor(
    private _api: ApiService,
    private _autenticacao: AutenticacaoService,
    private router: Router,
    public dialog: MatDialog) {
    this.currentUser = _autenticacao.currentUserValue;
  }

  ngOnInit() {
    this.screenOrdens = [];
    this._api.getOrdensServicoAbertas()
      .subscribe(res => {
        this.ordens = res;
        this.screenOrdens = this.screenOrdens.concat(this.ordens);
      }, err => {
        console.log(err);
      });

    this._api.getOrdensServico()
      .subscribe(res => {
        this.myOrdens = res;
        this.screenOrdens = this.screenOrdens.concat(this.myOrdens);
      }, err => {
        console.log(err);
      });
  }

  logout() {
    this._autenticacao.logout();
    this.router.navigate(["/login"]);
  }

  openModal(item: ServiceOrder, finalizar: boolean) {
    const dialogConfig = new MatDialogConfig();
    let title: string;
    let text: string;

    if (!finalizar) {
      text = "Deseja realmente assumir esta Ordem de Serviço?";
      title = "Assumir Ordem de Serviço";
    } else {
      text = "Deseja realmente finalizar esta Ordem de Serviço?";
      title = "Finalizar Ordem de Serviço";
    }

    dialogConfig.disableClose = false;
    dialogConfig.data = {
      title: title,
      text: text,
    };

    const dialogRef = this.dialog.open(MyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        finalizar ? this.finalizarOS(item) : this.assumirOS(item);
      }
    });
  }

  finalizarOS(ordemServico: ServiceOrder) {
    ordemServico.endDate = new Date();
    this._api.saveOrder(ordemServico);
  }

  assumirOS(ordemServico: ServiceOrder) {
    ordemServico.attributionDate = new Date();
    ordemServico.installer = this.currentUser;

    this._api.saveOrder(ordemServico).subscribe(item => ordemServico = item);
  }
}
