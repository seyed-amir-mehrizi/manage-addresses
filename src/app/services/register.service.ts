import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Register } from "../shared/model/model";


@Injectable({
    providedIn: 'root'
})

export class RegisterService {
    constructor(private http: HttpClient) {

    }

    registerUser(command: Register) {
        return this.http.post('http://localhost:3000/register', command);
    }
}