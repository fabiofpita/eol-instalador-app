import { Injectable } from '@angular/core';

const TOKEN = 'currentUser';

@Injectable({
    providedIn: 'root'
})
export class InstaladorService {

    setToken(token: string): void {
        localStorage.setItem(TOKEN, token);
    }

    isLogged() {
        return localStorage.getItem(TOKEN) != null;
    }
}