import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { InstaladorService } from './service/instalador.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NeedAuthGuard implements CanActivate {

    constructor(private instaladorService: InstaladorService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const redirectUrl = route['_routerState']['url'];

        if (this.instaladorService.isLogged()) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        return false;
    }
}