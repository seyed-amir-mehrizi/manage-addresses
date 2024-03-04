import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../shared/model/model";


@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private http: HttpClient) {
    }

    login(command: Login) {
        return this.http.post('http://localhost:3000/login', command);
    }
}