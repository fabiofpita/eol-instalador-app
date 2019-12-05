import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ApiParameter } from '../model/apiParameter';
import { ApiReturn } from '../model/apiReturn';
import { AutenticacaoService } from './autenticacao.service';
import { User } from '../model/user';
import { ServiceOrder } from '../model/serviceOrder';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:8080/api';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);

            return of(result as T);
        };
    }


    getOrdensServico(): Observable<ServiceOrder[]> {
        const user: any = JSON.parse(localStorage.getItem('currentUser'));

        if (user.user) {
            const url = `${apiUrl}/myOrders/${user.user.id}`;

            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            });

            let options = {
                headers: httpHeaders
            };

            return this.http.get<ServiceOrder[]>(url, options);

        }

    }

    getOrdensServicoAbertas(): Observable<ServiceOrder[]> {
        const user: any = JSON.parse(localStorage.getItem('currentUser'));

        if (user.user) {
            const url = `${apiUrl}/openOrders`;

            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            });

            let options = {
                headers: httpHeaders
            };

            return this.http.get<ServiceOrder[]>(url, options);

        }

    }

    logar(email: String, senha: String): Observable<any> {
        const url = `${apiUrl}/login`;


        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        });

        let options = {
            headers: httpHeaders
        };

        let requestParameter: ApiParameter = {
            username: email,
            password: senha,
        }

        return this.http.post<ApiReturn>(url, requestParameter, options);
    }

    saveOrder(order: ServiceOrder) {
        const url = `${apiUrl}/saveOrder`;


        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        });

        let options = {
            headers: httpHeaders
        };

        let requestParameter: ApiParameter = {
            order: order
        }

        return this.http.post<ServiceOrder>(url, requestParameter, options);
    }
}